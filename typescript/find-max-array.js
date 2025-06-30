// tìm số lớn nhất 
var numberarr = [1, 3, 7, 2, 5];
var max = numberarr[0];
for (var i = 1; i < numberarr.length; i++) {
    if (numberarr[i] > max) {
        max = numberarr[i];
    }
    console.log("the value max is ", max);
}
