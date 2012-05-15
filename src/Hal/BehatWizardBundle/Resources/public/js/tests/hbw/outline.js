test('outline can be converted to string', function() {

    var outline1 = new hbw.outline();

    outline1.push({name:"Lepine",firstname:"Jean-Francois"});
    outline1.push({name:"Foo",firstname:"Bar"});

    equal(outline1.toString(), "| Lepine | Jean-Francois |\n| Foo | Bar |", 'Example is converted to string');
});


//test('outline can be converted to form element', function() {
//});

test('Given rows are checked', function() {

    var outline1 = new hbw.outline();
    raises(function() {
        outline1.push('value1');
    }, null, 'Give invalid parameters to an outline node thhrows Exception')
});