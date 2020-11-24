
(function ($, undefined) {
    "use strict";

    var pagination_next_url = $('link[rel=next]').attr('href'),
        $load_posts_button  = $('.load-more');

    $load_posts_button.click(function(e) {
        e.preventDefault();

        var request_next_link = pagination_next_url.split(/page/)[0] + 'page/' + pagination_next_page_number + '/';

        $.ajax({
        url: request_next_link,
        beforeSend: function() {
            $load_posts_button.text('Loading');
            $load_posts_button.addClass('button--loading');
        }
        }).done(function(data) {
            var posts = $('.post', data);
            $load_posts_button.text('Show more');
            $load_posts_button.removeClass('button--loading');

            $('.posts').append(posts);

            pagination_next_page_number++;

            // If you are on the last pagination page, add the disabled attribute
            if (pagination_next_page_number > pagination_available_pages_number) {
                $load_posts_button.addClass('d-none');
            }
        });
    });
})(jQuery);