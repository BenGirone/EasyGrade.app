import React from 'react';
import CourseMathEngine from './Math'

class Course extends React.Component {
    constructor(props) {
        super(props);
        
        this.mathEngine = new CourseMathEngine(props.items, 90);

        this.state = {
            items: this.mathEngine.items,
            keyGen: 0,
            desiredGrade: 90
        };

        this.itemNameTooltip = '(Optional) Enter the name of your assignment/test.';
        this.itemPointstooltip = 'Enter the points or percentage this assignment/test contributes to your final grade.';
        this.itemEarnedTooltip = 'Enter the grade you earned on this assignment/test if it has been given.';
        this.itemNeededTooltip = 'This field indicates the score you need on this assignment to acheive your desired grade.';

        this.addItem = this.addItem.bind(this);
        this.example = this.example.bind(this);
        this.clear = this.clear.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    render() {
        return (
            <div className="Course">
                <div className="controlBar">
                    <button className="controlsBtn" id="addBtn" onClick={this.addItem}>Add Item</button>
                    <button className="controlsBtn" id="switchBtn" onClick={this.example}>Show Example</button>
                    <button className="controlsBtn" id="clearBtn" onClick={this.clear}>Clear Items</button>
                </div>

                <div className="DesiredGrade">
                    <span>Desired Grade:&nbsp;</span>
                    <input type="text" value={this.state.desiredGrade} className="CourseInput DesiredGradeInput" onChange={this.handleChange}/>
                    <span>&nbsp;(%)</span>
                </div>

                <div hidden={!this.state.currentTooltip}>
                    {this.state.currentTooltip}
                </div>

                <div className="CourseGrid">
                <>
                {this.state.items.map((item, i) => {
                    return <CourseItem data={item} key={i + this.state.keyGen} index={i} parent={this}/>
                })}
                </>
                </div>
            </div>
          );
    }

    handleChange(event) {
        this.mathEngine.desiredGrade = Number(event.target.value) || 0;

        this.setState({
            items: this.mathEngine.setItems(this.state.items), 
            keyGen: this.state.keyGen,
            desiredGrade: Number(event.target.value) || 0
        });
    }

    example() {
        this.clear();

        const newItems = [
            this.state.items[0],
            {name: "Test 1", maxValue: 100, value: 96},
            {name: "Test 2", maxValue: 100},
            {name: "Essay", maxValue: 50, value: 89},
            {name: "Pop Quiz", maxValue: 10}
        ];

        this.setState({
            items: this.mathEngine.setItems(newItems), 
            keyGen: this.state.keyGen + 100, 
            desiredGrade: this.state.desiredGrade
        });
    }

    clear() {
        this.setState({
            items: this.mathEngine.setItems([this.state.items[0]]), 
            keyGen: this.state.keyGen + 100, 
            desiredGrade: this.state.desiredGrade
        });
    }

    update(data, index) {
        const newItems = [];
        
        for (let i = 0; i < this.state.items.length; i++) {
            if (i === index) {
                newItems.push(data);
            } else {
                newItems.push(this.state.items[i]);
            }
        }

        this.setState({
            items: this.mathEngine.setItems(newItems), 
            keyGen: this.state.keyGen, 
            desiredGrade: this.state.desiredGrade
        });
    }

    deleteItem(index) {
        const newItems = [];
        for (let i = 0; i < this.state.items.length; i++) {
            if (i !== Number(index)) {
                newItems.push(this.state.items[i]);
            }
        }

        this.setState({
            items: this.mathEngine.setItems(newItems), 
            keyGen: this.state.keyGen + 100, 
            desiredGrade: this.state.desiredGrade
        });
    }

    addItem(event) {
        const newItems = this.state.items.slice();
        newItems.push({name: "Assignment", maxValue: 100, needed: '', value: ''});

        this.setState({
            items: this.mathEngine.setItems(newItems), 
            keyGen: this.state.keyGen + 100, 
            desiredGrade: this.state.desiredGrade
        });
    }
};

class CourseItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            parent: props.parent,
            index: props.index
        };

        this.handleChange = this.handleChange.bind(this);
        this.requestDelete = this.requestDelete.bind(this);
    }

    handleChange(event) {
        const data = {
            name: this.state.data.name,
            maxValue: this.state.data.maxValue,
            value: this.state.data.value,
            needed: this.state.data.needed
        };

        data[event.target.name] = event.target.value;

        data.maxValue = Number(data.maxValue) || 0;
        data.value = (data.value === '') ? '' : Number(data.value) || 0;

        this.setState({data: data, parent: this.state.parent, index: this.state.index});

        this.state.parent.update(data, this.state.index);
    }

    requestDelete(event) {
        this.state.parent.deleteItem(this.state.index);
    }
    
    render() {
        if (this.state.data.header) {
            return <div className="CourseItem">
                <div className="CourseItemName" title={this.itemNameTooltip} onClick={this.tooltip}><input className="CourseInput" type="text" value={this.state.data.name} disabled={true}/></div>
                <div className="CourseItemNumber" title={this.itemPointstooltip} onClick={this.tooltip}><input className="CourseInput" type="text" value={this.state.data.maxValue} disabled={true}/></div>
                <div className="CourseItemNumber" title={this.itemEarnedTooltip} onClick={this.tooltip}><input className="CourseInput" type="text" value={this.state.data.value + '(%)'} disabled={true}/></div>
                <div className="CourseItemNumber" title={this.itemNeededTooltip} onClick={this.tooltip}><input className="CourseInput" type="text" value={this.state.data.needed + '(%)'} disabled={true}/></div>
                <div className="CourseItemControl"></div>
            </div>
        } else {
            return <div className="CourseItem">
                <div className="CourseItemName"><input className="CourseInput" type="text" name="name" value={this.state.data.name} onChange={this.handleChange}/></div>
                <div className="CourseItemNumber"><input className="CourseInput" type="text" name="maxValue" value={this.state.data.maxValue} onChange={this.handleChange}/></div>
                <div className="CourseItemNumber"><input className="CourseInput" type="text" name="value" value={this.state.data.value} onChange={this.handleChange}/></div>
                <div className="CourseItemNumber"><input className="CourseInput" type="text" value={this.state.data.needed || '---'} disabled={true}/></div>
                <div className="CourseItemControl"><button className="controlsBtn red" onClick={this.requestDelete}>&nbsp;X&nbsp;</button></div>
            </div>
        }
    }
};

export default Course;