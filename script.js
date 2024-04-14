$(document).ready(function() {

    // Initialize tooltips for question mark icons
    $('.question-icon').tooltip({
        trigger: 'hover',
        placement: 'top'
    });

    // Remove popover initialization
    $('[data-toggle="tooltip"]').popover('dispose');

    // Custom JavaScript logic for tax calculation and form submission
    $('#submitBtn').click(function() {
        // Reset error icons and tooltips
        $('.error-icon').tooltip('dispose');

        // Validate inputs
        let isValid = true;
        let grossIncome = $('#grossIncome').val();
        let extraIncome = $('#extraIncome').val();
        let deductions = $('#deductions').val();
        let age = $('#age').val();

        // Check if grossIncome is a valid number
        if (grossIncome === "" || isNaN(grossIncome)) {
            $('#incomeErrorIcon').addClass('fas fa-exclamation-circle').attr('title', 'Please enter a valid number').tooltip('show');
            isValid = false;
        }

        // Check if extraIncome is a valid number
        if (extraIncome === "" || isNaN(extraIncome)) {
            $('#extraIncomeErrorIcon').addClass('fas fa-exclamation-circle').attr('title', 'Please enter a valid number').tooltip('show');
            isValid = false;
        }

        // Check if deductions is a valid number
        if (deductions === "" || isNaN(deductions)) {
            $('#deductionsErrorIcon').addClass('fas fa-exclamation-circle').attr('title', 'Please enter a valid number').tooltip('show');
            isValid = false;
        }

        // Check if age is selected
        if (age === "") {
            $('#ageErrorIcon').addClass('fas fa-exclamation-circle').attr('title', 'Age group is required').tooltip('show');
            isValid = false;
        }

        if (isValid) {
            // Perform tax calculation
            grossIncome = parseFloat(grossIncome);
            extraIncome = parseFloat(extraIncome);
            deductions = parseFloat(deductions);
            let tax = 0;

            // Calculate taxable income
            let taxableIncome = grossIncome + extraIncome - deductions - 800000;

            // Apply tax rates based on age
            if (taxableIncome > 0) {
                if (age === "<40") {
                    tax = 0.3 * taxableIncome;
                } else if (age === ">=40 & <60") {
                    tax = 0.4 * taxableIncome;
                } else if (age === ">=60") {
                    tax = 0.1 * taxableIncome;
                }
            }

            // Display result in modal
            $('#resultText').text(`Your overall income will be ${tax.toFixed(0)} after tax deductions`);
            $('#resultModal').modal('show');
        }
    });

    // Handle input change events to hide error icons when input is corrected
    $('#grossIncome, #extraIncome, #deductions, #age').on('input change', function() {
        $(this).siblings('.error-icon').tooltip('dispose');
    });
});
