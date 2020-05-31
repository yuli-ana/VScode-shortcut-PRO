console.log('test');

const modalLeft = $(".modalLeft");
const modalRight = $(".modalRight");
const modal = $(".modal");
const intro = $('.intro');
const start = $('.buttonStart');



start.on('click', function(e) {
    e.preventDefault();
    $(modalRight).animate({
        width: 0
    });
    $(modalLeft).animate({
        width: 0
    });

    $(intro).hide();
})