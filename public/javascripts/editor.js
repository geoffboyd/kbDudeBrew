// Grab some necessary elements from the DOM that we need
const childFlag = document.getElementById('childHomebrew');
const childOfField = document.getElementById('child_of');
const extraBreak = document.getElementById('child_of_br');
const mdTextarea = document.getElementById('markdown');

// Add our event listeners
childFlag.addEventListener('change', toggleChildOf, false);
mdTextarea.addEventListener('input', autoResize, false);
mdTextarea.addEventListener('focus', autoResize, false);
mdTextarea.addEventListener('click', autoResize, false);

// If our flag indicating this sheet has a parent sheet is checked, make sure the related field is visible
if (childFlag.hasAttribute('checked') && childOfField.hasAttribute('type')) {
    toggleChildOf();
}

// Event handler related functions
function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}

function toggleChildOf() {
    if (childFlag.checked) {
        // Show the field to link it to it's parent
        childOfField.removeAttribute('type');
        childOfField.setAttribute('required', 'true');
        extraBreak.classList.add('active');
    } else {
        // Clear and hide the field to link to a parent
        childOfField.setAttribute('type', 'hidden');
        childOfField.removeAttribute('required');
        extraBreak.classList.remove('active');
    }
}
