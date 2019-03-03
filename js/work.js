function submit() {
    $.get({
        url: "words_get_initial",
        success: function(data){
            //TODO
        },
        error: function(jqXHR, exception){
            handleError(jqXHR);
        }
    });
}