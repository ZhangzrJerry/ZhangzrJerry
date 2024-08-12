window.onload = function () {
    fetch("../data/projects.json").then(response => response.json()).then(res => {
        data = res
    });
}

if (window.location.href.includes('projects')) {
    viewmoreidx = -1;
    setInterval(clock, 1000);
    document.getElementById('viewmore').addEventListener('scroll', () => {
        document.getElementById('viewmore-exit').style.top = (document.getElementById('viewmore').scrollTop) + 'px';
    });
}

function clock() {
    var t = new Date().toLocaleTimeString();
    // check if the grid is empty
    if (document.getElementById('overview-grid').innerHTML.length < 3) {
        console.log(t, "rerendered");
        render();
        document.getElementById('viewmore').addEventListener('scroll', () => {
            document.getElementById('viewmore-exit').style.top = (document.getElementById('viewmore').scrollTop) + 'px';
        });
    }
}

function render() {
    // fullfill the grid with cards
    let element = document.getElementById('overview-grid');
    element.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
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
                    <div class="description">
                        ${data[i].introduction[0]}
                    </div>
                    <button onClick="viewmore(${i})" class="view">
                        [ view more ]
                    </button>                 
                </div>
            </div>
        `;
    }
}

function viewmore(idx) {
    viewmoreidx = idx;
    document.getElementById('viewmore').innerHTML = `
        <img src=${data[idx].image} class="viewmore-cover">
        <button id="viewmore-exit" class="Btn" onClick="viewless()">
            <div class="exit"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
            <div class="text">EXIT</div>
        </button>
        <p class="viewmore-heading">
            ${data[idx].heading}
        </p>
        <div class="viewmore-content" id="viewmore-content">
        </div>
    `;
    for (let i = 0; i < data[idx].introduction.length; i++) {
        document.getElementById('viewmore-content').innerHTML += `${data[idx].introduction[i]}`;
    }
    document.getElementById('viewmore').style.display = 'grid';
    document.getElementById('viewmore-exit').style.marginLeft = (document.getElementById('viewmore').offsetWidth - 55) + 'px';
}

function viewless() {
    viewmoreidx = -1;
    document.getElementById('viewmore').innerHTML = '';
    document.getElementById('viewmore').style.display = 'none';
}



window.onresize = function () {
    if (viewmoreidx > -1) {
        document.getElementById('viewmore-exit').style.marginLeft = (document.getElementById('viewmore').offsetWidth - 55) + 'px';
    }
}