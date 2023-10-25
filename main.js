console.log("working")

function exportPDF() {
    // Set a predefined LaTeX formula
    const latexFormula = "\\text{Daily Profit} = \\frac{1}{7} \\times \\left( \\frac{ \\left( \\frac{\\text{MAB}}{\\text{SUC}} \\times \\frac{\\text{CR}}{100} \\times \\text{ATP} \\times \\left( \\frac{\\text{APM}}{100} \\right) \\right) - \\text{MAB} - \\left( \\frac{\\text{MAB}}{\\text{SUC}} \\times \\text{SC} \\right) }{4} \\right)";
    const formulaElement = document.getElementById('formula');
    formulaElement.innerHTML = `\\[ ${latexFormula} \\]`;
    formulaElement.style.backgroundColor = "black"; // Set background color to black
    formulaElement.style.color = "white"; // Set text color to white
  
    // Update MathJax and then generate PDF
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, formulaElement], function() {
      console.log("MathJax has finished typesetting");
      
      html2canvas(formulaElement, { backgroundColor: "black", scale: 2 }).then(canvas => {
        console.log("html2canvas has finished rendering");
  
        const imgData = canvas.toDataURL('image/png');
        console.log('imgData', imgData);
          
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        pdf.text('lol', 10, 10);
        pdf.addImage(imgData, 'PNG', 10, 20, 180, 50);
        pdf.save('formula.pdf');
        console.log("PDF has been saved");
      }).catch(err => {
        console.error("html2canvas error: ", err);
      });
    });
  }
  
  
  


let weeklyProfitBeforeRoofingAccelerator = document.querySelector(".weekly-profit-before-roofing-accelerator-amount").textContent;
let weeklyProfitAfterRoofingAccelerator = document.querySelector(".weekly-profit-after-roofing-accelerator-amount").textContent;
let monthlyInquiriesCurrentMetrics = document.querySelector("#monthlyInquiriesAmount");
let monthlyJobsCurrentMetrics = document.querySelector("#monthlyJobsCurrentMetricsAmount");
let leadCost = document.querySelector("#leadCostAmount");
let bookedAppointmentCost = document.querySelector("#bookedAppointmentCost");
let bookedAppointmentRate = document.querySelector("#bookedAppointmentRate");
let showUpCost = document.querySelector("#showUpCost");
let showUpRate = document.querySelector("#showUpRate");
let closeRate = document.querySelector("#closeRateSlider");
let avgTicketPrice = document.querySelector("#avgTicketPrice");
let avgProfitMargin = document.querySelector("#avgProfitMargin");
let serviceCharge = document.querySelector("#serviceChargeAmount")
let monthlyAdBudget = document.querySelector("#monthlyAdBudgetAmount");
let dailyJobs = document.querySelector("#dailyJobs");
let weeklyJobs = document.querySelector("#weeklyJobs");
let monthlyJobs = document.querySelector("#monthlyJobs");
let yearlyJobs = document.querySelector("#yearlyJobs");
let dailyProfit = document.querySelector("#dailyProfit");
let weeklyProfit = document.querySelector("#weeklyProfit");
let monthlyProfit = document.querySelector("#monthlyProfit");
let yearlyProfit = document.querySelector("#yearlyProfit");

const elements = [
    monthlyInquiriesCurrentMetrics,
    monthlyJobsCurrentMetrics,
    leadCost,
    bookedAppointmentCost,
    bookedAppointmentRate,
    showUpCost,
    showUpRate,
    closeRate,
    avgTicketPrice,
    avgProfitMargin,
    monthlyAdBudget,
    dailyJobs,
    weeklyJobs,
    monthlyJobs,
    yearlyJobs,
    dailyProfit,
    weeklyProfit,
    monthlyProfit,
    yearlyProfit
];


elements.forEach(element => {
    element.addEventListener('input', () => {

        closeRate.addEventListener('input', function(event) {
            // If LeadCost, Booked Appointment, Show Up Present -> Calculate Jobs
            if (leadCost.value && bookedAppointmentCost.value && bookedAppointmentRate.value && showUpCost.value && showUpRate.value) {
                updateJobsAgencyMetrics();
                updateProfitAgencyMetrics();
            }

            document.querySelector("#closeRateDisplay").textContent = event.target.value + "%";

            // Calculate monthly jobs based on monthly inquiries and close rate
            let monthlyJobsCalculatedThroughMonthlyInquiriesAndCloseRateNumber = Number(monthlyInquiriesCurrentMetrics.value) * Number(closeRate.value / 100);
            if (isNaN(monthlyJobsCalculatedThroughMonthlyInquiriesAndCloseRateNumber) || monthlyJobsCalculatedThroughMonthlyInquiriesAndCloseRateNumber === Infinity) {
                monthlyJobsCurrentMetrics.value = 0;
            } else {
                monthlyJobsCurrentMetrics.value = monthlyJobsCalculatedThroughMonthlyInquiriesAndCloseRateNumber % 1 ? monthlyJobsCalculatedThroughMonthlyInquiriesAndCloseRateNumber.toFixed(2) : monthlyJobsCalculatedThroughMonthlyInquiriesAndCloseRateNumber;
            }
            

            if (leadCost.value == 0 && bookedAppointmentCost.value == 0 && bookedAppointmentRate.value == 0 && showUpCost.value == 0 && showUpRate.value == 0) {
                console.log("lol")
                if (isNaN(monthlyJobsCurrentMetrics.value) || monthlyJobsCurrentMetrics.value === Infinity) {
                    monthlyJobs.value = 0;
                    weeklyJobs.value = 0;
                    dailyJobs.value = 0;
                    yearlyJobs.value = 0;
                } else {
                    let monthlyValueA = Number(monthlyJobsCurrentMetrics.value);
                    let monthlyValueB = monthlyValueA % 1 ? monthlyValueA.toFixed(2) : monthlyValueA;
                    monthlyJobs.value = monthlyValueB;
                    weeklyJobs.value = (monthlyValueB / 4) % 1 ? (monthlyValueB / 4).toFixed(2) : (monthlyValueB / 4);
                    dailyJobs.value = (monthlyValueB / 28) % 1 ? (monthlyValueB / 28).toFixed(2) : (monthlyValueB / 28);
                    yearlyJobs.value = (monthlyValueB * 12) % 1 ? (monthlyValueB * 12).toFixed(2) : (monthlyValueB * 12);

                    if (avgProfitMargin.value > 0 && avgTicketPrice.value > 0) {
                        const monthlyProfitValue = avgTicketPrice.value * (avgProfitMargin.value / 100) * monthlyJobs.value;
                        const weeklyProfitValue = monthlyProfitValue / 4;
                        const dailyProfitValue = monthlyProfitValue / 28;
                        const yearlyProfitValue = monthlyProfitValue * 12;

                        if (isNaN(monthlyProfitValue) || monthlyProfitValue === Infinity) {
                            monthlyProfit.value = 0;
                            weeklyProfit.value = 0;
                            dailyProfit.value = 0;
                            yearlyProfit.value = 0;
                        } else {
                            monthlyProfit.value = monthlyProfitValue % 1 ? monthlyProfitValue.toFixed(2) : monthlyProfitValue;
                            weeklyProfit.value = weeklyProfitValue % 1 ? weeklyProfitValue.toFixed(2) : weeklyProfitValue;
                            dailyProfit.value = dailyProfitValue % 1 ? dailyProfitValue.toFixed(2) : dailyProfitValue;
                            yearlyProfit.value = yearlyProfitValue % 1 ? yearlyProfitValue.toFixed(2) : yearlyProfitValue;
                        }
                    }
                    
                }
            }

        });


        let updatingInquiries = false;
        let updatingJobs = false;

        if (element === monthlyJobsCurrentMetrics) {
            console.log("test")
            monthlyJobs.value = monthlyJobsCurrentMetrics.value;
        }

        if (element === leadCost) {
            if(monthlyJobsCurrentMetrics.value > 0 || monthlyInquiriesCurrentMetrics > 0) {
                monthlyJobsCurrentMetrics.value = 0;
                monthlyInquiriesCurrentMetrics.value = 0;
                dailyJobs.value = 0;
                weeklyJobs.value = 0;
                monthlyJobs.value = 0;
                yearlyJobs.value = 0;
                dailyProfit.value = 0;
                weeklyProfit.value = 0;
                monthlyProfit.value = 0;
                yearlyProfit.value = 0;
            }
        }

        // Update weeklyJobsCurrentMetrics based on weeklyInquiries
        if (element === monthlyInquiriesCurrentMetrics && !updatingJobs) {
            updatingInquiries = true;

            // Calculate new monthly job value
            let monthlyJobsNewValue = Number(monthlyInquiriesCurrentMetrics.value) * Number(closeRate.value) / 100;
            if (isNaN(monthlyJobsNewValue) || monthlyJobsNewValue === Infinity) {
                console.log(`NaN or Infinite`)
                monthlyJobsCurrentMetrics.value = 0;
                monthlyJobs.value = 0;
            } else {
                monthlyJobsCurrentMetrics.value = monthlyJobsNewValue % 1 ? monthlyJobsNewValue.toFixed(2) : monthlyJobsNewValue;
                monthlyJobs.value = monthlyJobsCurrentMetrics.value;
            }

            // Additional calculations for daily, weekly, and yearly jobs
            let calculations = [{
                    value: (monthlyJobsCurrentMetrics.value / 4) / 7,
                    target: dailyJobs
                },
                {
                    value: monthlyJobsCurrentMetrics.value / 4,
                    target: weeklyJobs
                },
                {
                    value: monthlyJobsCurrentMetrics.value * 12,
                    target: yearlyJobs
                }
            ];

            for (let calc of calculations) {
                if (isNaN(calc.value) || calc.value === Infinity) {
                    console.log(`NaN or Infinite`)
                    calc.target.value = 0;
                } else {
                    calc.target.value = calc.value % 1 ? calc.value.toFixed(2) : calc.value;
                }
            }

            updatingInquiries = false;


        }

        // Update weeklyInquiries based on weeklyJobs
        if (element === monthlyJobsCurrentMetrics && !updatingInquiries) {
            updatingJobs = true;

            // Calculations for monthlyInquiriesCurrentMetrics and job values
            const newValue = (Number(monthlyJobsCurrentMetrics.value) / (Number(closeRate.value)) * 100);
            if (isNaN(newValue) || newValue === Infinity) {
                console.log(`NaN or Infinite`)
                monthlyInquiriesCurrentMetrics.value = 0;
            } else {
                monthlyInquiriesCurrentMetrics.value = newValue % 1 ? newValue.toFixed(2) : newValue;
            }

            // Additional calculations for daily, weekly, monthly, and yearly jobs
            let calculations = [{
                    value: (monthlyJobsCurrentMetrics.value / 4) / 7,
                    target: dailyJobs
                },
                {
                    value: monthlyJobsCurrentMetrics.value / 4,
                    target: weeklyJobs
                },
                {
                    value: monthlyJobsCurrentMetrics.value,
                    target: monthlyJobs
                },
                {
                    value: monthlyJobsCurrentMetrics.value * 12,
                    target: yearlyJobs
                }
            ];

            for (let calc of calculations) {
                if (isNaN(calc.value) || calc.value === Infinity) {
                    console.log(`NaN or Infinite`)
                    calc.target.value = 0;
                } else {
                    calc.target.value = calc.value % 1 ? calc.value.toFixed(2) : calc.value;
                }
            }

            updatingJobs = false;

            // Profit calculations
            let profitCalculations = [{
                    value: (monthlyJobs.value / 28) * (avgTicketPrice.value * (avgProfitMargin.value / 100)),
                    target: dailyProfit
                },
                {
                    value: (monthlyJobs.value / 4) * (avgTicketPrice.value * (avgProfitMargin.value / 100)),
                    target: weeklyProfit
                },
                {
                    value: monthlyJobs.value * (avgTicketPrice.value * (avgProfitMargin.value / 100)),
                    target: monthlyProfit
                },
                {
                    value: (monthlyJobs.value * 12) * (avgTicketPrice.value * (avgProfitMargin.value / 100)),
                    target: yearlyProfit
                }
            ];

            for (let calc of profitCalculations) {
                if (isNaN(calc.value) || calc.value === Infinity) {
                    console.log(`NaN or Infinite`)
                    calc.target.value = 0;
                } else {
                    calc.target.value = calc.value % 1 ? calc.value.toFixed(2) : calc.value;
                }
            }

        }

        if ((element === avgTicketPrice && !isNaN(avgProfitMargin.value)) || (!isNaN(avgTicketPrice.value) && element === avgProfitMargin) && !isNaN(monthlyInquiriesCurrentMetrics.value) && !isNaN(monthlyJobsCurrentMetrics.value) && !isNaN(closeRate.value)) {
            const newProfitValue = Number(avgTicketPrice.value) * (Number(avgProfitMargin.value) / 100) * Number(monthlyJobs.value);

            if (isNaN(newProfitValue) || newProfitValue === Infinity) {
                document.querySelector(".weekly-profit-before-roofing-accelerator-amount").textContent = '$0';
                console.log(`NaN or Infinite`)
                dailyProfit.value = 0;
                weeklyProfit.value = 0;
                monthlyProfit.value = 0;
                yearlyProfit.value = 0;
            } else {
                document.querySelector(".weekly-profit-before-roofing-accelerator-amount").textContent = '$' + (newProfitValue % 1 ? newProfitValue.toFixed(2) : newProfitValue);
                dailyProfit.value = newProfitValue / 30;
                weeklyProfit.value = newProfitValue / 4;
                monthlyProfit.value = newProfitValue;
                yearlyProfit.value = newProfitValue * 12;
            }

        }

        if ((element === avgProfitMargin && !isNaN(avgTicketPrice.value)) || (!isNaN(avgTicketPrice.value) && element === avgProfitMargin) && !isNaN(monthlyInquiriesCurrentMetrics.value) && !isNaN(monthlyJobsCurrentMetrics.value) && !isNaN(closeRate.value)) {
            const newProfitValue = Number(avgTicketPrice.value) * (Number(avgProfitMargin.value) / 100) * Number(monthlyJobs.value);

            if (isNaN(newProfitValue) || newProfitValue === Infinity) {
                document.querySelector(".weekly-profit-before-roofing-accelerator-amount").textContent = '$0';
                console.log(`NaN or Infinite`)
                dailyProfit.value = 0;
                weeklyProfit.value = 0;
                monthlyProfit.value = 0;
                yearlyProfit.value = 0;
            } else {
                document.querySelector(".weekly-profit-before-roofing-accelerator-amount").textContent = '$' + (newProfitValue % 1 ? newProfitValue.toFixed(2) : newProfitValue);
                dailyProfit.value = newProfitValue / 30;
                weeklyProfit.value = newProfitValue / 4;
                monthlyProfit.value = newProfitValue;
                yearlyProfit.value = newProfitValue * 12;
            }

        }

        if ((element === dailyJobs)) {
            monthlyInquiriesCurrentMetrics.value = 0;
            monthlyJobsCurrentMetrics.value = 0;

            // Calculate weeklyJobsNewValue
            let weeklyJobsNewValue = dailyJobs.value * 7;
            if (isNaN(weeklyJobsNewValue) || weeklyJobsNewValue === Infinity) {
                console.log(`NaN or Infinite`)
                weeklyJobs.value = 0;
            } else {
                weeklyJobs.value = weeklyJobsNewValue % 1 ? weeklyJobsNewValue.toFixed(2) : weeklyJobsNewValue;
            }

            // Calculate monthlyJobsNewValue
            let monthlyJobsNewValue = (dailyJobs.value * 7) * 4;
            if (isNaN(monthlyJobsNewValue) || monthlyJobsNewValue === Infinity) {
                console.log(`NaN or Infinite`)
                monthlyJobs.value = 0;
            } else {
                monthlyJobs.value = monthlyJobsNewValue % 1 ? monthlyJobsNewValue.toFixed(2) : monthlyJobsNewValue;
            }

            // Calculate yearlyJobsNewValue
            let yearlyJobsNewValue = monthlyJobs.value * 12;
            if (isNaN(yearlyJobsNewValue) || yearlyJobsNewValue === Infinity) {
                console.log(`NaN or Infinite`)
                yearlyJobs.value = 0;
            } else {
                yearlyJobs.value = yearlyJobsNewValue % 1 ? yearlyJobsNewValue.toFixed(2) : yearlyJobsNewValue;
            }

        }

        let updatingBookedAppointmentCost = false;
        let updatingBookedAppointmentRate = false;
        let updatingShowUpCost = false;
        let updatingShowUpRate = false;


        if (element === bookedAppointmentRate && !updatingBookedAppointmentCost) {
            updatingBookedAppointmentRate = true;
            const newValue = Number(leadCost.value / (bookedAppointmentRate.value / 100));

            if (isNaN(newValue) || newValue === Infinity) {
                console.log(`NaN or Infinite`)
                bookedAppointmentCost.value = 0;
            } else {
                bookedAppointmentCost.value = newValue % 1 ? newValue.toFixed(2) : newValue;
            }

            updatingBookedAppointmentRate = false;

        }

        if (element === bookedAppointmentCost && !updatingBookedAppointmentRate) {
            updatingBookedAppointmentCost = true;
            const newValue = Number((leadCost.value / bookedAppointmentCost.value) * 100);

            if (isNaN(newValue) || newValue === Infinity) {
                console.log(`NaN or Infinite`)
                bookedAppointmentRate.value = 0;
            } else {
                bookedAppointmentRate.value = newValue % 1 ? newValue.toFixed(2) : newValue;
            }

            updatingBookedAppointmentCost = false;

        }

        if (element === showUpRate && !updatingShowUpCost) {
            updateShowUpRate();
        }

        if (element === showUpCost && !updatingShowUpRate) {
            updateShowUpCost();
        }

        if (element === leadCost) {
            // Calculate BAPCV (Booked Appointment Cost Value)
            // Calculate BAPCV
            const BAPCV = Number(leadCost.value / (bookedAppointmentRate.value / 100));
            if (isNaN(BAPCV) || BAPCV === Infinity) {
                console.log(`NaN or Infinite`)
                bookedAppointmentCost.value = 0;
            } else {
                bookedAppointmentCost.value = BAPCV % 1 ? BAPCV.toFixed(2) : BAPCV;
            }

            // Calculate BAPRV
            const BAPRV = Number(leadCost.value / (bookedAppointmentRate.value / 100));
            if (isNaN(BAPRV) || BAPRV === Infinity) {
                console.log(`NaN or Infinite`)
                bookedAppointmentCost.value = 0;
            } else {
                bookedAppointmentCost.value = BAPRV % 1 ? BAPRV.toFixed(2) : BAPRV;
            }

            // Calculate SURV
            const SURV = Number((bookedAppointmentCost.value / showUpRate.value) * 100);
            if (isNaN(SURV) || SURV === Infinity) {
                console.log(`NaN or Infinite`)
                showUpCost.value = 0;
            } else {
                showUpCost.value = SURV % 1 ? SURV.toFixed(2) : SURV;
            }

        }



        if (element === monthlyAdBudget && leadCost.value && (bookedAppointmentCost.value || bookedAppointmentRate.value) && (showUpCost.value || showUpRate.value)) {
            updateJobsAgencyMetrics();
            updateProfitAgencyMetrics();
        };

        if (element === weeklyProfit) {
            // Calculate dailyProfitNewValue
            let dailyProfitNewValue = weeklyProfit.value / 7;
            if (isNaN(dailyProfitNewValue) || dailyProfitNewValue === Infinity) {
                console.log(`NaN or Infinite`)
                dailyProfit.value = 0;
            } else {
                dailyProfit.value = dailyProfitNewValue % 1 ? dailyProfitNewValue.toFixed(2) : dailyProfitNewValue;
            }

            // Calculate monthlyProfitNewValue
            let monthlyProfitNewValue = weeklyProfit.value * 4;
            if (isNaN(monthlyProfitNewValue) || monthlyProfitNewValue === Infinity) {
                console.log(`NaN or Infinite`)
                monthlyProfit.value = 0;
            } else {
                monthlyProfit.value = monthlyProfitNewValue % 1 ? monthlyProfitNewValue.toFixed(2) : monthlyProfitNewValue;
            }

            // Calculate yearlyProfitNewValue
            let yearlyProfitNewValue = monthlyProfit.value * 12;
            if (isNaN(yearlyProfitNewValue) || yearlyProfitNewValue === Infinity) {
                console.log(`NaN or Infinite`)
                yearlyProfit.value = 0;
            } else {
                yearlyProfit.value = yearlyProfitNewValue % 1 ? yearlyProfitNewValue.toFixed(2) : yearlyProfitNewValue;
            }



        }

        if (element === bookedAppointmentCost) {
            updateShowUpRate();
            updateJobsAgencyMetrics();
            updateProfitAgencyMetrics();
        }

        if (element === bookedAppointmentRate) {
            updateShowUpCost();
            updateJobsAgencyMetrics();
            updateProfitAgencyMetrics();
        }



        function updateShowUpCost() {
            updatingShowUpCost = true;
            const newValue = (Number(bookedAppointmentCost.value) / Number(showUpCost.value)) * 100;

            if (isNaN(newValue) || newValue === Infinity) {
                console.log(`NaN or Infinite`)
                showUpRate.value = 0;
            } else {
                showUpRate.value = newValue % 1 ? newValue.toFixed(2) : newValue;
            }

            updatingShowUpCost = false;
            updateJobsAgencyMetrics();
            updateProfitAgencyMetrics();

        }

        function updateShowUpRate() {
            updatingShowUpRate = true;
            const newValue = Number((bookedAppointmentCost.value / showUpRate.value) * 100);

            if (isNaN(newValue) || newValue === Infinity) {
                console.log(`NaN or Infinite`)
                showUpCost.value = 0;
            } else {
                showUpCost.value = newValue % 1 ? newValue.toFixed(2) : newValue;
            }

            updatingShowUpRate = false;
            updateJobsAgencyMetrics();
            updateProfitAgencyMetrics();

        }


        // must be present: monthlyAdBudget, showUpCost, closeRate
        function updateJobsAgencyMetrics() {

            const MAB = Number(monthlyAdBudget.value);
            const LC = Number(leadCost.value);
            const BAPC = Number(bookedAppointmentCost.value);
            const BAPR = Number(bookedAppointmentRate.value);
            const SUR = Number(showUpRate.value);
            const SUC = Number(showUpCost.value);
            const CR = Number(closeRate.value);
            const APT = Number(avgTicketPrice.value);
            const APM = Number(avgProfitMargin.value);
            const NOA = (MAB / LC) * (SUR / 100);
            const SCA = MAB / SUC;
            const SCV = Number(serviceCharge.value);
            let CAC = SUC / (CR / 100);
            let ROI = Number((((MAB / SUC) * (CR / 100) * (APT * (APM / 100))) - (MAB + (SCA * SCV))) / (MAB + (SCA * SCV)) * 100);

            // Checking for NaN or Infinity in ROI
            if (isNaN(ROI) || ROI === Infinity) {
                ROI = 0;
            }

            if (ROI > 0) {
                document.querySelector(".roi-number").classList.add("roi-number-positive")
                document.querySelector(".roi-number").classList.remove("roi-number-negative")
                document.querySelector(".roi-number").classList.remove("roi-number-neutral")
                document.querySelector(".roi-number").textContent = `${ROI.toFixed(2)}%`;
            }

            if (ROI === 0) {
                document.querySelector(".roi-number").classList.add("roi-number-neutral")
                document.querySelector(".roi-number").classList.remove("roi-number-positive")
                document.querySelector(".roi-number").classList.remove("roi-number-negative")
                document.querySelector(".roi-number").textContent = `${ROI.toFixed(2)}%`;
            }

            if (ROI < 0) {
                document.querySelector(".roi-number").classList.add("roi-number-negative")
                document.querySelector(".roi-number").classList.remove("roi-number-positive")
                document.querySelector(".roi-number").classList.remove("roi-number-neutral")
                document.querySelector(".roi-number").textContent = `${ROI.toFixed(2)}%`;
            }

            const dailyJobsValue = (MAB / CAC) / 28;
            const weeklyJobsValue = (MAB / CAC) / 4;
            const monthlyJobsValue = (MAB / CAC);
            const yearlyJobsValue = (MAB / CAC) * 12;

            // Checking for NaN or Infinity in job values
            if (isNaN(dailyJobsValue) || dailyJobsValue === Infinity) {
                dailyJobs.value = 0;
                console.log(`NaN or Infinite`)
            } else dailyJobs.value = dailyJobsValue % 1 ? dailyJobsValue.toFixed(2) : dailyJobsValue;

            if (isNaN(weeklyJobsValue) || weeklyJobsValue === Infinity) {
                weeklyJobs.value = 0;
                console.log(`NaN or Infinite`)
            } else weeklyJobs.value = weeklyJobsValue % 1 ? weeklyJobsValue.toFixed(2) : weeklyJobsValue;

            if (isNaN(monthlyJobsValue) || monthlyJobsValue === Infinity) {
                monthlyJobs.value = 0;
                console.log(`NaN or Infinite`)
            } else monthlyJobs.value = monthlyJobsValue % 1 ? monthlyJobsValue.toFixed(2) : monthlyJobsValue;

            if (isNaN(yearlyJobsValue) || yearlyJobsValue === Infinity) {
                yearlyJobs.value = 0;
                console.log(`NaN or Infinite`)
            } else yearlyJobs.value = yearlyJobsValue % 1 ? yearlyJobsValue.toFixed(2) : yearlyJobsValue;

        }

        // Must be present: monthlyJobs, avgTicketPrice, AvgProfitMargin, monthlyAdBudget, showUpCost, serviceCharge(if not, then set to 0)
        function updateProfitAgencyMetrics() {
            if (serviceCharge.value === '') {
                serviceCharge.value = 0;
            }

            const MAB = Number(monthlyAdBudget.value);
            const LC = Number(leadCost.value);
            const SUR = Number(showUpRate.value);
            const SUC = Number(showUpCost.value);
            const CR = Number(closeRate.value);
            const APT = Number(avgTicketPrice.value);
            const APM = Number(avgProfitMargin.value);
            const NOA = (MAB / LC) * (SUR / 100);
            const SCA = MAB / SUC;
            const SCV = Number(serviceCharge.value);
            let CAC = SUC / (CR / 100);
            let ROI = (((MAB / SUC) * (CR / 100) * (APT * (APM / 100)) - (MAB + (SCA * SCV))) / (MAB + (SCA * SCV))) * 100;

            // Check for invalid ROI
            if (isNaN(ROI) || ROI === Infinity || ROI === -Infinity) {
                ROI = 0;
            }

            if (ROI > 0) {
                document.querySelector(".roi-number").classList.add("roi-number-positive")
                document.querySelector(".roi-number").classList.remove("roi-number-negative")
                document.querySelector(".roi-number").classList.remove("roi-number-neutral")
                document.querySelector(".roi-number").textContent = `${ROI.toFixed(2)}%`;
            }

            if (ROI == 0) {
                document.querySelector(".roi-number").classList.add("roi-number-neutral")
                document.querySelector(".roi-number").classList.remove("roi-number-positive")
                document.querySelector(".roi-number").classList.remove("roi-number-negative")
                document.querySelector(".roi-number").textContent = `${ROI.toFixed(2)}%`;
            }

            if (ROI < 0) {
                document.querySelector(".roi-number").classList.add("roi-number-negative")
                document.querySelector(".roi-number").classList.remove("roi-number-positive")
                document.querySelector(".roi-number").classList.remove("roi-number-neutral")
                document.querySelector(".roi-number").textContent = `${ROI.toFixed(2)}%`;
            }

            const dailyProfitValue = (((APT * (APM / 100) - CAC) * (MAB / CAC)) - ((MAB / SUC) * SCV)) / 28;
            const weeklyProfitValue = (((APT * (APM / 100) - CAC) * (MAB / CAC)) - ((MAB / SUC) * SCV)) / 4;
            const monthlyProfitValue = ((APT * (APM / 100) - CAC) * (MAB / CAC)) - ((MAB / SUC) * SCV);
            const yearlyProfitValue = (((APT * (APM / 100) - CAC) * (MAB / CAC)) - ((MAB / SUC) * SCV)) * 12;

            // Check for invalid profit values
            if (isNaN(dailyProfitValue) || dailyProfitValue === Infinity || dailyProfitValue === -Infinity) {
                dailyProfit.value = 0;
                console.log(`NaN or Infinite`)
            } else dailyProfit.value = dailyProfitValue % 1 ? dailyProfitValue.toFixed(2) : dailyProfitValue;

            if (isNaN(weeklyProfitValue) || weeklyProfitValue === Infinity || weeklyProfitValue === -Infinity) {
                weeklyProfit.value = 0;
                console.log(`NaN or Infinite`)
            } else weeklyProfit.value = weeklyProfitValue % 1 ? weeklyProfitValue.toFixed(2) : weeklyProfitValue;

            if (isNaN(monthlyProfitValue) || monthlyProfitValue === Infinity || monthlyProfitValue === -Infinity) {
                monthlyProfit.value = 0;
                console.log(`NaN or Infinite`)
            } else monthlyProfit.value = monthlyProfitValue % 1 ? monthlyProfitValue.toFixed(2) : monthlyProfitValue;

            if (isNaN(yearlyProfitValue) || yearlyProfitValue === Infinity || yearlyProfitValue === -Infinity) {
                yearlyProfit.value = 0;
                console.log(`NaN or Infinite`)
            } else yearlyProfit.value = yearlyProfitValue % 1 ? yearlyProfitValue.toFixed(2) : yearlyProfitValue;
        }
    })
});