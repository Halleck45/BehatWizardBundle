test('outline can be converted to string', function() {

    var outline1 = new hbw.domain.outline();

    outline1.push({
        name:"Lepine",
        firstname:"Jean-Francois"
    });
    outline1.push({
        name:"Foo",
        firstname:"Bar"
    });

    equal(outline1.toString(), "| Lepine | Jean-Francois |\n| Foo | Bar |", 'Example is converted to string');
});


test('Outline can be converted to form element', function() {
    var outline1 = new hbw.domain.outline();
    outline1.push({
        name:"Lepine",
        firstname:"Jean-Francois"
    });
    outline1.push({
        name:"Foo",
        firstname:"Bar"
    })
    var scenario1 = new hbw.domain.scenario();
    var step1 = new hbw.domain.step('given','example of description');

    var result = outline1.toForm(scenario1, step1, 0);
    equal(result.match(/<input/g).length,4, 'Outline is converted to multiple form elements');

    ok(result.match(/<th>name<\/th>/), 'Outline renders header');
});

test('Rows given to an outline node are checked', function() {

    var outline1 = new hbw.domain.outline();
    raises(function() {
        outline1.push('value1');
    }, null, 'Give invalid parameters to an outline node thhrows Exception')
});
