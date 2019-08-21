
var a = 6000
var b = 7000

console.log(perfectsquare(a,b));
function perfectsquare(a,b)
{
    var value = a;
    var count = 0;
    while(value<=b)
    {
        let sqrt = Math.sqrt(value);
        //print(sqrt)
        if(sqrt % 1 == 0)
        {
            let num = getcountofsqrt(value);
            //print(num)
            if(count<num)
            {
                count=num;
            }
        }
        var val = parseInt(sqrt/1)+1;
        //print(val)
        value = val * val;
        //print(value)
    }
    return count;
}

function getcountofsqrt(num)
{
    let sqrt = Math.sqrt(num);
    if(sqrt % 1 != 0)
    {
        return 0;
    }
    else
    {
        var countsqr =  1 + getcountofsqrt(sqrt);
        return countsqr
    }
}
