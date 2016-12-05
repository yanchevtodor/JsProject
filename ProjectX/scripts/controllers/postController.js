function getKinveyUserAuthHeaders() {
    return{
        Authorization: "Kinvey "+ sessionStorage.getItem("authToken")
    }
}

function listPosts() {
    $('#posts').empty();

    $.ajax({
        method:"GET",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Posts",
        headers: getKinveyUserAuthHeaders(),
        success: loadPostsSuccess,
        error: handleAjaxError
    });
    function loadPostsSuccess(posts) {

        let table =$(
            `<table>
                <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
                </tr>
           </table>`);

        for(let post of posts){
            let tr = $('<tr>');
            displayTableRow(tr, post);
            tr.appendTo(table);
        }

        $('#posts').append(table);
    }
    function displayTableRow(tr, post) {

        let links = [];
        if(post._acl.creator == sessionStorage.getItem('userId')){
            let deleteLink = $("<a href='#'>[Delete]</a>").click(function () {
                deletePost(post._id)
            });
            let editLink = $("<a href='#'>[Edit]</a>").click(function () {
                linkEditPost();
                loadEditPost(post._id);

            });
            links.push(deleteLink);
            links.push(" ");
            links.push(editLink);
        }
        tr.append(
            $('<td>').text(post.Title),
            $('<td>').text(post.body),
            $("<td>").append(links)
        )
    }
}

function deletePost(postID) {
    $.ajax({
        method:"DELETE",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Posts/" + postID,
        headers: getKinveyUserAuthHeaders(),
        success: deletePostSuccess,
        error: handleAjaxError
    });

    function deletePostSuccess() {
        showInfo('Post deleted.');
        listPosts();
    }
}
function createPost() {

    let postData = {
        Title: $('#postTitle').val(),
        body: $('#postBody').val()
    };

    $.ajax({
        method:"POST",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Posts",
        headers: getKinveyUserAuthHeaders(),
        data: postData,
        success: createPostSuccess,
        error: handleAjaxError
    });

    function createPostSuccess() {
        showInfo('Post created.');
        listPosts();
    }
}

function loadEditPost(postID) {
    $.ajax({
        method:"GET",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Posts/" + postID,
        headers: getKinveyUserAuthHeaders(),
        success: editPostSuccess,
        error: handleAjaxError
    });

    function editPostSuccess(post) {

        $('#formEditBook input[name=title]').val(post.Title);
        $('#formEditBook input[name=body]').val(post.body);
        $('#formEditBook input[name=id]').val(post._id)
    }
}

function editPost() {  //formBook = EDIT BOOK!!!

    let postData = {
        Title:  $('#editTitle').val(),
        body:  $('#editBody').val(),
        id: $('#editID').val()
    };
    $.ajax({
        method:"PUT",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Posts/" + postData.id,
        headers: getKinveyUserAuthHeaders(),
        data: postData,
        success: editPostSuccess,
        error: handleAjaxError
    });

    function editPostSuccess() {
        showInfo('Post edited.');
        listPosts();
    }
}