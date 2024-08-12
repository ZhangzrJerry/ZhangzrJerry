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
        let viewmore = data[i].link.length > 0 ? "view more >>" : "[ view more ]";
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
                    <button onClick="viewmore(${i})" class="view">
                        ${viewmore}
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
    document.getElementById('viewmore').innerHTML = `
        <img src=${data[idx].image} class="viewmore-cover">
        <p class="viewmore-heading">
            ${data[idx].heading}
        </p>
        <p class="viewmore-text">
            ${data[idx].introduction}
        </p>
        <button class="Btn" onClick="viewless()">
            <div class="exit"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
            <div class="text">Return</div>
        </button>


    `;
    document.getElementById('viewmore').style.display = 'block';
}

function viewless() {
    document.getElementById('viewmore').innerHTML = '';
    document.getElementById('viewmore').style.display = 'none';
}