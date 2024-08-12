window.onload = function () {
    fetch("../data/projects.json").then(response => response.json()).then(res => {
        data = res
    });
    int = self.setInterval("clock()", 500)
}

function clock() {
    var t = new Date().toLocaleTimeString();
    // check if the grid is empty
    if (document.getElementById('overview-grid').innerHTML.length < 3) {
        render();
        console.log(t, "rerendered");
    }
}

function render() {
    // fullfill the grid with cards
    let element = document.getElementById('overview-grid');
    element.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        let viewmore = data[i].link.length < 1 ? 0 : 1;
        element.innerHTML += `
            <div class="card">
                <div class="card-image">
                    <img src=${data[i].image} class="card-image">
                </div>
                <div class="category">
                ${data[i].brief}
                </div>
                <div class="heading">
                    ${data[i].heading}
                    <div class="sign">
                        <div class="author">
                            ${data[i].prefix}
                            <span class="name">
                                ${data[i].author}
                            </span>
                        </div>
                        <div class="date">
                            ${data[i].date}
                        </div>
                    </div>
                </div>
                <div class="content">
                    <p class="description">
                    ${data[i].introduction}
                    </p>
                    <a class="view" style="opacity:${viewmore}">
                        view more >>
                    </a>       
                    <button onClick="viewmore(${i})" class="view" style="opacity:${1 - viewmore}">
                        [ view more ]
                    </button>                 
                </div>
            </div>
        `;
    }
}

function viewmore(idx) {
    if (data[idx].link.length > 0) {
        window.location.href = data[idx].link;
        return;
    }
    window.alert(data[idx].introduction);

}