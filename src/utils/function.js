/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-this-alias */
Function.prototype.clone = function() {
    const that = this;
    const temp = function temporary() { return that.apply(this, arguments); };
    for (const key in this) {
        if (this.hasOwnProperty(key)) {
            temp[key] = this[key];
        }
    }
    return temp;
};
