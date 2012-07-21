test('Step can be converted to string', function() {

    var step1 = new hbw.domain.step('given','example of description');

    equal(step1.toString(), 'example of description', 'Step is converted to string');
});
test('Step can be converted to form element', function() {

    var scenario1 = new hbw.domain.scenario();
    var step1 = new hbw.domain.step('given','example of description');

    ok(step1.toForm(scenario1, 0).match(/<input/),'Step is converted to form element');
});


