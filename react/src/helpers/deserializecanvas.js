export default function deserialize(data, canvas) {
    var img = new Image();
    console.log(data);
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0);
    };
    img.src = data;
}
