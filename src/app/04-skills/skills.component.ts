import { SkillCriteria, Skill } from './skills.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Component, AfterViewInit, Inject, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { SkillsService } from './skills.service';
import * as d3cloud from 'd3-cloud';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements AfterViewInit {

    private skillCriteria: SkillCriteria = new SkillCriteria();



    private baseKnobOptions = {
        'skin': {
            'type': 'simple', 'width': 10, 'color': 'rgba(255,0,0,.5)', 'spaceWidth': 5
        },
        'animate': { 'enabled': true, 'duration': 1000, 'ease': 'bounce' },
        'size': 100,
        'startAngle': -140,
        'endAngle': 140,
        'unit': '',
        'displayInput': true,
        'readOnly': false,
        'trackWidth': 10,
        'barWidth': 15,
        'trackColor': 'rgba(200,200,200,.8)',
        'barColor': '#e67e22',
        'prevBarColor': '#e67e22',
        'textColor': '#000000',
        'barCap': 0,
        'trackCap': 0,
        'fontSize': 'auto',
        'subText': { 'enabled': true, 'text': 'xxx', 'color': '#000000', 'font': '11' },
        'bgColor': '',
        'bgFull': false,
        'scale': { 'enabled': true, 'type': 'lines', 'color': '#000000', 'width': 2, 'quantity': 20, 'height': 5, 'spaceWidth': 1 },
        'step': 1,
        'displayPrevious': true,
        'min': 0,
        'max': 100,
        'dynamicOptions': false
    };



    private linkedInScoreKnobOptions: any = this.options('lnkdn score', 50);

    private nbOfProjectsKnobOptions: any = this.options('in projects', 50);

    private confidenceKnobOptions: any = this.options('confidence', 10);

    private daysDoneKnobOptions: any = this.options('days', 500);

    private interestKnobOptions: any = this.options('interest', 10);

    private lastTimeSeenKnobOptions: any = this.options('last seen', 100);

    private obs = new Subject();
    private obs$ = this.obs.asObservable();

    private data: any = {
        'name': 'cluster',
        'children': []
    };


    valueChange(event:any) {
        this.obs.next(event);
    }



    private div: any;
    private treemap: any;


    private options(subText, max) {
        let result = JSON.parse(JSON.stringify(this.baseKnobOptions));
        result.subText.text = subText;
        result.max = max;
        return result;
    }


    constructor( @Inject(SkillsService) private _skillsService: SkillsService) { }

    private wordCloud:any;


    buildWordCloud() {




        function wordCloud(selector) {

            let skillviewer: any = document.getElementsByClassName('skillviewer')[0];
            let wordcloud_canvas: any = document.getElementById('wordcloud');
            wordcloud_canvas.innerHTML = '';
            wordcloud_canvas.width = skillviewer.offsetWidth;
            wordcloud_canvas.height = skillviewer.offsetHeight;

            console.log(wordcloud_canvas.width);
            console.log(wordcloud_canvas.height);

            var fill = d3.scale.category20();

            //Construct the word cloud's SVG element
            var svg = d3.select(selector).append("svg")
                .attr("width",  "100%")
                .attr("height",  "100%")
                .append("g")
                .attr("transform", "translate(" + wordcloud_canvas.width / 2 + "," + 250 + ")");


            //Draw the word cloud
            function draw(words) {
                var cloud = svg.selectAll("g text")
                    .data(words, function (d) { return d.text; })

                //Entering words
                cloud.enter()
                    .append("text")
                    .style("font-family", "Impact")
                    .style("fill", function (d, i) { return fill(i); })
                    .attr("text-anchor", "middle")
                    .attr('font-size', 1)
                    .text(function (d) { return d.text; });

                //Entering and existing words
                cloud
                    .transition()
                    .duration(600)
                    .style("font-size", function (d) { return d.size + "px"; })
                    .attr("transform", function (d) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .style("fill-opacity", 1);

                //Exiting words
                cloud.exit()
                    .transition()
                    .duration(200)
                    .style('fill-opacity', 1e-6)
                    .attr('font-size', 1)
                    .remove();
            }


            //Use the module pattern to encapsulate the visualisation code. We'll
            // expose only the parts that need to be public.
            return {

                //Recompute the word cloud for a new set of words. This method will
                // asycnhronously call draw when the layout has been computed.
                //The outside world will need to call this function, so make it part
                // of the wordCloud return value.
                update: function (words) {
                    d3cloud().size([ wordcloud_canvas.width , wordcloud_canvas.height])
                        .words(words)
                        .padding(5)
                        .rotate(function () { return ~~(Math.random() * 2) * 90; })
                        .font("Impact")
                        .fontSize(function (d) { return d.size; })
                        .on("end", draw)
                        .start();
                }
            }

        }

        //Create a new instance of the word cloud visualisation.
        this.wordCloud = wordCloud('#wordcloud');

    }

    updateWorldCloud(skills: Array<Skill>) {
        let skillviewer: any = document.getElementsByClassName('skillviewer')[0];
        this.wordCloud.update(skills.map(function (skill) {
                    return { text: skill.name, size: skill.nbOfProjects * (skillviewer.offsetWidth / 300) };
                }));
    }

    ngAfterViewInit() {

        this.buildWordCloud();
        this.obs$.debounceTime(500).startWith('').subscribe((click) => {
            this._skillsService.getSkills(this.skillCriteria).subscribe((skills) => {
                this.updateWorldCloud(skills);
            });
        });

    }

    cloudClick(event: any) {
        console.log(JSON.stringify(event));
    }

    resizeEvent(event: any) {
        this.buildWordCloud();
        this.valueChange(event);
    }
}



/*

presets todo :



*/
