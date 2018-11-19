var svg;
var parser = new DOMParser();



var viz = new Viz();

console.log('Loaded! main');


function updateGraphVizFromOmins(data) {
//     document.write(JSON.stringify(data));
//     var x = JSON.parse(JSON.stringify(data));
//     document.write(JSON.stringify(x));

    var params = {
        src: data.src || 'digraph { a -> b }',
        options: {
            engine: data.engine || 'dot',
            format: 'svg'
        }
    };

    // document.write(JSON.stringify(params));

    viz.renderSVGElement(params.src, params.options)
        .then(function(result) {
            console.log(result);
            var graph = document.querySelector("#output");

            if (svg) {
                graph.removeChild(svg);
            }
            svg = result;
            svg.id = "svg_output";
            graph.appendChild(svg);

            panZoom = svgPanZoom(svg, {
                zoomEnabled: true,
                controlIconsEnabled: true,
                fit: true,
                center: true,
                minZoom: 0.1
            });

            svg.addEventListener('paneresize', function (e) {
                panZoom.resize();
            }, false);
            window.addEventListener('resize', function (e) {
                panZoom.resize();
            });
        });

}

function getGraphSvg(data) {
    var params = {
        src: data.src || 'digraph { a -> b }',
        options: {
            engine: data.engine || 'dot',
            format: 'svg'
        }
    };

    return viz.renderString(params.src, params.options)
        .then(function(result) {
            console.log(result);
            return result;
        });

} 