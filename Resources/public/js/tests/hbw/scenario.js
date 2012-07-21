test('Scenario can receive steps', function() {
    var outline1 = new hbw.domain.outline();
    outline1.push({
        name:"Lepine",
        firstname:"Jean-Francois"
    });


    var step1 = new hbw.domain.step('given','I am a logged in user with following');
    step1.outline = outline1;

    var step2 = new hbw.domain.step('then', 'I sould see my name on the screen');

    var scenario1 = new hbw.domain.scenario();
    scenario1
    .addStep(step1)
    .addStep(step2);
    equal(scenario1.steps.length, 2, 'Steps are added to scenario');

    var step3 = new hbw.domain.step('given','Another condition');
    scenario1.addStep(step3, 1);

    equal(scenario1.steps[1], step3,'Step is correctly inserted in the scenario');
});