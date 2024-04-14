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
        let grossIncome = parseFloat($('#grossIncome').val());
        let extraIncome = parseFloat($('#extraIncome').val());
        let deductions = parseFloat($('#deductions').val());
        let age = $('#age').val();

        // Check if inputs are valid numbers
        if (isNaN(grossIncome) || isNaN(extraIncome) || isNaN(deductions)) {
            displayError('#incomeErrorIcon', 'grossIncome', 'Please enter a valid number');
            displayError('#extraIncomeErrorIcon', 'extraIncome', 'Please enter a valid number');
            displayError('#deductionsErrorIcon', 'deductions', 'Please enter a valid number');
            isValid = false;
        }

        // Check if age is selected
        if (age === "") {
            displayError('#ageErrorIcon', 'age', 'Age group is required');
            isValid = false;
        }

        if (isValid) {
            // Perform tax calculation
            let tax = calculateTax(grossIncome, extraIncome, deductions, age);

            // Display result in modal
            $('#resultText').text(`Your overall income will be ${tax.toFixed(0)} Lakhs after tax deductions`);
            $('#resultModal').modal('show');
        }
    });

    // Handle input change events to hide error icons when input is corrected
    $('#grossIncome, #extraIncome, #deductions, #age').on('input change', function() {
        $(this).siblings('.error-icon').tooltip('dispose');
    });

    // Function to calculate tax based on income, extra income, deductions, and age
    function calculateTax(grossIncome, extraIncome, deductions, age) {
        // Calculate taxable income
        let taxableIncome = grossIncome + extraIncome - deductions - 800000;
        if (taxableIncome <= 0) {
            return 0; // No tax owed
        }

        // Apply tax rates based on age 
        let taxRate = 0;
        switch (age) {
            case "<40":
                taxRate = 0.3;
                break;
            case ">=40 & <60":
                taxRate = 0.4;
                break;
            case ">=60":
                taxRate = 0.1;
                break;
            default:
                return 0; // Invalid age
        }

        return taxRate * taxableIncome;
    }

    // Function to display error message and icon
    function displayError(iconSelector, inputId, message) {
        $(iconSelector).addClass('fas fa-exclamation-circle').attr('title', message).tooltip('show');
        $(`#${inputId}`).siblings('.error-icon').addClass('fas fa-exclamation-circle').attr('title', message).tooltip('show');
    }
});
