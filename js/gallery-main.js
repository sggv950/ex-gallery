console.log('Starting up');

function renderProjects() {
    var projects = getProjects();
    var strHtmls = projects.map(function (project) {
        return `
    
        <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick="renderModal('${project.id}')">
                <div class="portfolio-hover">
                    <div class="portfolio-hover-content">
                        <i class="fa fa-plus fa-3x"></i>
                    </div>
                </div>
                <img class="img-fluid" src="img/proj-imgs/${project.id}-1.png" alt="">
            </a>
            <div class="portfolio-caption">
                <h4>${project.name}</h4>
                <p class="text-muted">${project.desc}</p>
            </div>
        </div>
    
    `
    })
    $('#portfolio .container .row-2').append(strHtmls.join(''));

}

function renderModal(projId) {
    var project = getProjectById(projId);
    var strHtml = `
    <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2>${project.name}</h2>
                <p class="item-intro text-muted">${project.title}.</p>
                <img class="img-fluid d-block mx-auto" src="img/proj-imgs/${project.id}-2.png" alt="">
                <p>${project.desc}</p>
                <ul class="list-inline">
                  <li>Date: ${moment(project.publishedAt).format("DD MMM YYYY")}</li>
                  <li>Client: ----</li>
                  <li>Category: ${project.labels.join(', ')}</li>
                </ul>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                <i class="fa fa-times"></i>
                Close Project</button>
                </div>
                <button class="btn btn-secondary"><a href="proj/${project.id}/index.html">Try It!</button>
        </div>
    </div>
    `

    $('.modal-content .container').html(strHtml);

}

function onSendMsg(){
    var msgSubject = $('#SubjectControlInput1').val();
    var msgBody = $('#FormControlTextarea1').val();
    sendMsg(msgSubject, msgBody);
}


$(document).ready(function(){
    renderProjects();
})