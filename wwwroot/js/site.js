window.drawCanvas = (canvas, events) => {
    const ctx = canvas.getContext('2d');
    const dayWidth = canvas.width / 7;
    let draggedEvent = null;
    let offsetY = 0;
    let offsetX = 0;

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i <= 7; i++) {
            ctx.beginPath();
            ctx.moveTo(i * dayWidth, 0);
            ctx.lineTo(i * dayWidth, canvas.height);
            ctx.stroke();
        }

        events.forEach(evt => {
            const start = new Date(evt.Start);
            const end = new Date(evt.End);
            const dayIndex = start.getDay();
            const x = dayIndex * dayWidth;
            const y = (start.getHours() / 24) * canvas.height;
            const height = ((end - start) / (1000 * 60 * 60) / 24) * canvas.height;

            evt._x = x;
            evt._y = y;
            evt._w = dayWidth - 4;
            evt._h = height;

            ctx.fillStyle = 'rgba(0, 120, 215, 0.5)';
            ctx.fillRect(x + 2, y, dayWidth - 4, height);
            ctx.fillStyle = '#000';
            ctx.fillText(evt.Title, x + 4, y + 12);
        });
    }

    function getEventAt(x, y) {
        return events.find(evt =>
            x >= evt._x && x <= evt._x + evt._w &&
            y >= evt._y && y <= evt._y + evt._h
        );
    }

    canvas.onmousedown = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const evt = getEventAt(x, y);
        if (evt) {
            draggedEvent = evt;
            offsetX = x - evt._x;
            offsetY = y - evt._y;
        }
    };

    canvas.onmousemove = (e) => {
        if (draggedEvent) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const newX = x - offsetX;
            const newY = y - offsetY;

            // Update event position based on Y position
            const newHour = (newY / canvas.height) * 24;
            const dayIndex = Math.floor(newX / dayWidth);
            const newDate = new Date();
            newDate.setDate(newDate.getDate() - newDate.getDay() + dayIndex);
            newDate.setHours(newHour);
            newDate.setMinutes(0);
            newDate.setSeconds(0);

            const duration = (new Date(draggedEvent.End) - new Date(draggedEvent.Start));
            draggedEvent.Start = newDate.toISOString();
            draggedEvent.End = new Date(newDate.getTime() + duration).toISOString();

            render();
        }
    };

    canvas.onmouseup = () => {
        if (draggedEvent) {
            console.log('Updated event:', draggedEvent);
            // Send to server here if needed
            draggedEvent = null;
        }
    };

    render();
};
