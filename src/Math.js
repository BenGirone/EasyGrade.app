class CourseMathEngine {
    constructor(items, desiredGrade) {
        this.desiredGrade = desiredGrade;
        this.setItems(items);
    }

    setItems(items) {
        this.items = items;
        const needed = this.getAverageNeededForDesiredGrade();

        for (const item of this.items.slice(1)) {
            if (!item.value && item.value !== 0) {
                item.needed = needed;
            } else {
                item.needed = '';
            }
        }

        return this.items;
    }

    getAverageNeededForDesiredGrade() {
        let knownPoints = 0.0;
        let unknownMaxPoints = 0.0;
        let totalPoints = 0.0;

        for (const item of this.items.slice(1)) {
            if (item.value || item.value === 0) {
                knownPoints += ((item.value / 100.0) * item.maxValue);
            } else {
                unknownMaxPoints += item.maxValue;
            }

            totalPoints += item.maxValue;
        }

        return (((totalPoints * (this.desiredGrade / 100.0)) - knownPoints) * 100) / unknownMaxPoints;
    }
}

export default CourseMathEngine;