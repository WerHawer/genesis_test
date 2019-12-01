$(document).ready(function() {
    $("a[href*=#]").on("click", function(e) {
        const anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 600);
        e.preventDefault();
        return false;
    });
});