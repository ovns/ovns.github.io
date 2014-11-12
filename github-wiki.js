//The name of the page in github
var github_page = "ovns"


//Find the title of the article to be shown
var title;
if (document.URL.match("=")) {
    title = document.URL.split("=")[1];
} else {
    title = "meta_index";
}

//transforms double brackets links into markdown links
function link_converter(md) {
    return md.replace(/\[\[(\w+)\]\]/g, function(match, p1, offset, string) {
        return "[" + p1 + "](/" + p1 + ")";
    });
}

//Initialize sanitizing converter.
var converter = Markdown.getSanitizingConverter();


//Load Markdown document, convert it and add it to the DOM.
function load_article(title) {
    $.ajax({
        url: "wiki/" + title + ".md",
        success: function(data) {
            var lmd = link_converter(data);
            var html = converter.makeHtml(lmd);
            $("#article").empty();
            $("#article").append(html);

            //Catch all links and redirect them to the correct url if they are local.
            $("a").on("click", function(e) {
                var link = $(e.target).attr("href");
                if (link[0] == "/" && link[1] != "/" && link.match(".html") == null) {
                    window.location.href = "/wiki.html?article=" + link.substr(1);
                    return false;
                }
            });

        },
        error: function() {
            load_article("meta_article_doesnt_exist");
        }
    });


}


$(function() {

    //Add event to the edit link
    $("#edit_link").click(function(e) {
        console.log("this");
        window.location.href = "https://github.com/" + github_page + "/" + github_page + ".github.io/blob/master/wiki/" + title + ".md";
        return false;
    });
    load_article(title);
})