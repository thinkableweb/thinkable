 function updateClock() {
            const options = {
                timeZone: 'Pacific/Auckland',
                hour12: true,
                hour: '2-digit',
                minute: '2-digit'
            };

            const now = new Date();
            
            const hours24 = now.toLocaleString('en-US', {
                timeZone: 'Pacific/Auckland',
                hour: '2-digit',
                hour12: false
            }).padStart(2, '0');

            const timeComponents = now.toLocaleString('en-US', options).split(' ');
            const [time, period] = timeComponents;
            const [_, minutes] = time.split(':');

            document.getElementById('clock').innerHTML = 
                `${hours24}<span class="colon">:</span>${minutes} ${period} NZT`;
        }

        // Update time every second
        setInterval(updateClock, 1000);

        // Initial update
        updateClock();
