function getKinveyUserAuthHeaders() {
    return {
        'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
    };
}
function listPosts() {
    $('#books').empty();
    showView('viewBooks');
    $.ajax({
        method: "GET",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Posts",
        headers: getKinveyUserAuthHeaders(),
        success: loadBooksSuccess,
        error: handleAjaxError
    });
    function loadBooksSuccess(posts) {
        showInfo('Books loaded.');
        if (posts.length == 0) {
            $('#books').text('No books in the library.');
        } 
        else {
            let postsTable = $('<table>').append($('<tr>').append('<th>Title</th>', '<th>Post body</th><th>Actions</th>'));
            for (let post of posts){
                appendBookRow(post, postsTable);
            }
            $('#books').append(postsTable);
        }
    }

}
function appendBookRow(book, postsTable) {
    let links = [];
    if (book._acl.creator == sessionStorage['userId']) {
        let deleteLink = $('<a href="#">[Delete]</a>').click(deleteBook.bind(this, book));
        let editLink = $('<a href="#">[Edit]</a>').click(loadBookForEdit.bind(this, book));
        links = [deleteLink, ' ', editLink];
    }
    postsTable.append($('<tr>').append(postsTable,links));
}

function createPost() {
    let postData = {
        Title: $('#postTitle').val(),
        body: $('#postBody').val()
    };
    $.ajax({
        method: "POST",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Posts",
        headers: getKinveyUserAuthHeaders(),
        data: postData,
        success: createBookSuccess,
        error: handleAjaxError
    });
    function createBookSuccess() {
        linkViewPosts();
        showInfo('Book created.');
    }
}
function editBook() {
    let bookData = {
        title: $('#formEditBook input[name=title]').val(),
        author: $('#formEditBook input[name=author]').val(),
        description:
            $('#formEditBook textarea[name=descr]').val()
    };
    $.ajax({
        method: "PUT",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey +
        "/books/" + $('#formEditBook input[name=id]').val(),
        headers: getKinveyUserAuthHeaders(),
        data: bookData,
        success: editBookSuccess,
        error: handleAjaxError
    });

    function editBookSuccess(response) {
        listBooks();
        showInfo('Book edited.');
    }
}



