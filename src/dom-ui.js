
let timeScaleSlider;

function initializeDomUi(){

	timeScaleSlider = createSlider(0, 1, 0.1, 0);
	timeScaleSlider.position(width - 240, 40);
	timeScaleSlider.size(200);
}

function isMousePressUsedByDom(){

	return timeScaleSlider.elt.matches(":hover");
}

function getTimeScaleInput(){

    return timeScaleSlider.value();
}
