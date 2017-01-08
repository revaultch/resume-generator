var fs = require('fs');
var Rx = require('rxjs/Rx');
var JSONPath = require('jsonpath-plus')
var ppp = require('papaparse')

var encoding = "utf-8"


function loadResume() {
    return Rx.Observable.create(observer => {
        fs.readFile('../resume.json', encoding, (err, result) => {
            if (err) {
                throw err
            }
            var resume = JSON.parse(result);
            observer.next(resume);
            observer.complete();
        });
    });
}


function mapToSkills(resume) {
    return Rx.Observable.create(observer => {
        var skills = JSONPath({ json: resume, path: '$..skills.technical.*' });
        for (var i = 0; i < skills.length; i++) {
            observer.next(skills[i]);
        }
        observer.complete();
    });

}


function getLinkedInData() {
    return Rx.Observable.create(observer => {
        fs.readFile('../raw/skills_linkedin.csv', encoding, (err, result) => {
            if (err) {
                throw err
            }
            var parsed = ppp.parse(result, { header: true });
            for (var i = 0; i < parsed.data.length; i++) {
                observer.next(parsed.data[i]);
            }
            observer.complete();
        });
    });
}

function getConfidenceData() {
    return Rx.Observable.create(observer => {
        fs.readFile('../raw/skills_confidence.csv', encoding, (err, result) => {
            if (err) {
                throw err
            }
            let parsed = ppp.parse(result, { header: true });
            for (var i = 0; i < parsed.data.length; i++) {
                observer.next(parsed.data[i]);
            }
            observer.complete();
        });
    });
}

function getInterestData() {
    return Rx.Observable.create(observer => {
        fs.readFile('../raw/skills_interest.csv', encoding, (err, result) => {
            if (err) {
                throw err
            }
            let parsed = ppp.parse(result, { header: true });
            for (var i = 0; i < parsed.data.length; i++) {
                observer.next(parsed.data[i]);
            }
            observer.complete();
        });
    });
}

function getExperiences() {
    return Rx.Observable.create(observer => {
        loadResume().subscribe((resume) => {
            var experiences = new Array();
            var json = resume.work_experience
            for (var i = 0; i < json.length; i++) {
                experiences.push(json[i]);
            }
            observer.next(experiences);
            observer.complete();
        })
    });
}

function enrichProperty(data, item, source, target) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].name === item.skill) {
            data[i][target] = item[source];
        }
    }
    return data;
}


function withManualConsolidation() {

    return Rx.Observable.create(observer => {
        var consolidatedData = new Array();
        loadResume()
            .flatMap((data) => { return mapToSkills(data) }).
            distinct()
            .map((skill) => { return { "name": "" + skill + "" } })
            .subscribe((skill) => {
                consolidatedData.push(skill);
            }, (err) => { }, () => {
                getLinkedInData().subscribe((item) => {
                    consolidatedData = enrichProperty(consolidatedData, item, "score", "linkedInScore");

                }, (err) => { }, () => {

                    getInterestData().subscribe((item) => {
                        consolidatedData = enrichProperty(consolidatedData, item, "interest", "interest");

                    }, (err) => { }, () => {

                        getConfidenceData().subscribe((item) => {
                            consolidatedData = enrichProperty(consolidatedData, item, "confidence", "confidence");

                        }, (err) => { }, () => {
                            for (var i = 0; i < consolidatedData.length; i++) {
                                observer.next(consolidatedData[i]);
                            }
                            observer.complete();
                        });


                    });


                });

            });

    });






}



function getExperienceEndDate(experience) {
    var endDate;
    if (!experience.end) {
        endDate = new Date()
    } else {
        endDate = new Date(experience.end.year, experience.end.month)
    }
    return endDate;
}

function getDaysBetween(startDate, endDate) {
    var t = +(endDate) - +(startDate);
    return t / (24 * 60 * 60 * 1000);
}

function getExperienceDays(experience) {
    var startDate = new Date(experience.start.year, experience.start.month);
    var endDate = getExperienceEndDate(experience);
    return getDaysBetween(startDate, endDate);
}

function getProjectDays(experience, project) {
    var result = 0;
    if (project.duration.endsWith("m")) {
        result = project.duration.substring(0, project.duration.length - 1) * 30;
    } else {
        result = project.duration * parseInt(getExperienceDays(experience)) / 100;
    }
    return result;
}

function mapDaysDone(item, experiences) {
    var daysDone = 0.0;
    for (var i=0;i<experiences.length;i++) {
        var experience = experiences[i];
        for (var i2=0; i2 < experience.projects.length; i2++) {
            var project = experience.projects[i2];
            if (project.skills.technical.indexOf(item.name) != -1) {
                daysDone += getProjectDays(experience, project);
            }
        }
    }
    item.daysDone = parseInt(daysDone);
    return item;
}

function mapNbOfProjects(item, experiences) {
    var nbOfProjects = 0;
    for (var i=0;i<experiences.length;i++) {
        var experience = experiences[i];
        for (var i2=0; i2 < experience.projects.length; i2++) {
            var project = experience.projects[i2];
            if (project.skills.technical.indexOf(item.name) != -1) {
                nbOfProjects += 1;
            }
        }
    }
    item.nbOfProjects = parseInt(nbOfProjects);
    return item;
}



function mapFreshness(item, experiences) {
    var lastTimeSeen = 0;
    for (var i=0;i<experiences.length;i++) {
        var experience = experiences[i];
        for (var i2=0; i2 < experience.projects.length; i2++) {
            var project = experience.projects[i2];
            if (project.skills.technical.indexOf(item.name) != -1) {
                lastTimeSeen = getDaysBetween(new Date(), getExperienceEndDate(experience));
            }
        }
    }
    item.lastTimeSeen = parseInt(lastTimeSeen);
    return item;
}


function withExperienceConsolidation() {
    // nb of projects
    // freshness

    return Rx.Observable.create(observer => {

        getExperiences().subscribe((experiences) => {
            withManualConsolidation()
                .map((item) => {return mapNbOfProjects(item, experiences)})
                .map((item) => {return mapDaysDone(item, experiences)})
                .map((item) => {return mapFreshness(item, experiences)})
                .subscribe((item) => {
                    observer.next(item);
                }, (err) => { throw err}, () => { observer.complete() });

        });

    });

}


function consolidate() {
        var skillsData = [];

        withExperienceConsolidation().subscribe((item) => {
            skillsData.push(item);
        }, (err) => {}, () => {
            fs.writeFile("../consolidated_skills.json", JSON.stringify(skillsData), function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            }); 
        });
}

consolidate();