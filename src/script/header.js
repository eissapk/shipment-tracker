class Header {
    static global() {
        Header.form = document.getElementById('form');
    }

    // check order
    static checkOrder(val) {
        // run ajax request
        Header.ajax(val);
    }

    // ajax
    static ajax(val) {
        let api;
        let src = 'https://eissa.xyz/shipment-tracker/data.json';
        let method = 'GET';
        let async = true;

        let xhr = new XMLHttpRequest();
        xhr.open(method, src, async);

        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) {
                return;
            }
            if (this.readyState === 4 && this.status === 200) {
                // get json object
                api = this.responseText;
                // *call success func
                Header.success(api, val);
            } else {
                // !call error func
                Header.error();
            }
        };

        xhr.send();

    }

    // success
    static success(api, val) {
        // parse data
        let data = JSON.parse(api);

        // select container
        const container = document.getElementById('phaseDetailInnerCon');
        // !wipe out container
        container.innerHTML = '';

        // reset all phases
        function resetFunc() {
            // grayscale
            let phase = document.querySelectorAll('.phase');
            let imgCon = document.querySelectorAll('.phaseImgCon');
            phase.forEach(function (el) {
                el.style.filter = 'grayscale(1)';
            });
            // animation
            imgCon.forEach(function (el) {
                el.classList.remove('animatePhase');
            });
        }
        // phase one
        function phase1(details) {
            // *animation part
            // current phase
            // grayscale
            document.querySelector('.phase-0').style.filter = 'grayscale(0)';
            // add class
            document.querySelector('.phaseImgCon-0').classList.add('animatePhase');

            // !tracking details part
            // create ul
            const ul = document.createElement('ul');
            // append to ul
            ul.innerHTML = details.phaseOne;
            // append to container
            container.appendChild(ul);
        }
        // phase two
        function phase2(details) {
            // *animation part
            // !other phases
            // grayscale
            document.querySelector('.phase-0').style.filter = 'grayscale(0)'; // phase one

            // current phase
            // grayscale
            document.querySelector('.phase-1').style.filter = 'grayscale(0)';
            // add class
            document.querySelector('.phaseImgCon-1').classList.add('animatePhase');

            // !tracking details part
            // create ul
            const ul = document.createElement('ul');
            // append to ul
            ul.innerHTML = details.phaseOne + details.phaseTwo;
            // append to container
            container.appendChild(ul);
        }
        // phase three
        function phase3(details) {
            // *animation part
            // !other phases
            // grayscale
            document.querySelector('.phase-0').style.filter = 'grayscale(0)'; // phase one
            document.querySelector('.phase-1').style.filter = 'grayscale(0)'; // phase two

            // current phase
            // grayscale
            document.querySelector('.phase-2').style.filter = 'grayscale(0)';
            // add class
            document.querySelector('.phaseImgCon-2').classList.add('animatePhase');

            // !tracking details part
            // create ul
            const ul = document.createElement('ul');
            // append to ul
            ul.innerHTML = details.phaseOne + details.phaseTwo + details.phaseThree;
            // append to container
            container.appendChild(ul);
        }
        // phase four
        function phase4(details) {
            // *animation part
            // !other phases
            // grayscale
            document.querySelector('.phase-0').style.filter = 'grayscale(0)'; // phase one
            document.querySelector('.phase-1').style.filter = 'grayscale(0)'; // phase two
            document.querySelector('.phase-2').style.filter = 'grayscale(0)'; // phase three

            // current phase
            // grayscale
            document.querySelector('.phase-3').style.filter = 'grayscale(0)';
            // add class
            document.querySelector('.phaseImgCon-3').classList.add('animatePhase');

            // !tracking details part
            // create ul
            const ul = document.createElement('ul');
            // append to ul
            ul.innerHTML = details.phaseOne + details.phaseTwo + details.phaseThree + details.phaseFour;
            // append to container
            container.appendChild(ul);
        }

        // *loop for getting success msg
        data.api.forEach(function (item) {
            if (item.order.invoiceNo == val) {
                // select properties
                let phase = item.order.phaseNo;
                let details = item.order.details;

                // reset all phases
                resetFunc();

                // *show tracking details container
                document.getElementById('phaseDetail').style.visibility = 'visible';

                // check phases
                if (phase == 1) {
                    phase1(details);
                } else if (phase == 2) {
                    phase2(details);
                } else if (phase == 3) {
                    phase3(details);
                } else if (phase == 4) {
                    phase4(details);
                }
            }
        });

        // !looping for getting error msg
        let filteredArr = data.api.filter(function (item) {
            return item.order.invoiceNo == val;
        });
        if (filteredArr.length <= 0) { // if array is empty
            // select notify
            let notify = document.getElementById('notify');
            let p = notify.querySelector('p');

            // append text
            p.textContent = `The order doesn't exist, make sure you entered the right order number.`;

            // show notify
            notify.style.right = '5px';

            // hide notify
            setTimeout(() => {
                notify.style.right = '-250px';
            }, 5000);

            // reset all phases
            resetFunc();
            // !hide tracking details container
            document.getElementById('phaseDetail').style.visibility = 'hidden';
        }

    }

    // error
    static error() {
        // select notify
        let notify = document.getElementById('notify');
        let p = notify.querySelector('p');

        // append text
        p.textContent = `Couldn't reach the server, refresh the page and try again.`;

        // show notify
        notify.style.right = '5px';

        // hide notify
        setTimeout(() => {
            notify.style.right = '-250px';
        }, 5000);
    }

    // notify
    static closeNotify() {
        let btn = document.querySelectorAll('.closeNotify');
        btn.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                document.getElementById('notify').style.right = '-250px';
            });
        });
    }

}

Header.global();

//* start events
Header.form.addEventListener('submit', function (e) {
    // prevent default behavior
    e.preventDefault();
    // select engine
    let input = document.getElementById('engine');
    // get value
    let val = input.value.trim();
    // call checkorder func
    Header.checkOrder(val);
    // enable notify
    Header.closeNotify();
});