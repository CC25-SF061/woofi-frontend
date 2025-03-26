/**
 * Count of all displayed star variants (full, half, empty)
 * @param {number} value
 * @returns amount of full star displayed, if it has half star, and amount of empty star display 
 */

export default function calcRateStars(value) {
    const lowest_half = 0.46;
    const highest_half = 0.76;

    let whole_rating = 0;
    let has_half_rating = false;
    let empty_rating = 5;

    if((value % 1.0) < lowest_half) {
        whole_rating = Math.floor(value);
    } else if ((value % 1.0) > highest_half) {
        whole_rating = Math.ceil(value);
    } else {
        whole_rating = Math.floor(value);
        has_half_rating = true;
    }

    if (whole_rating > 5) {
        has_half_rating = false;
        whole_rating = 5
    }
    
    empty_rating -= whole_rating;
    empty_rating -= has_half_rating ? 1 : 0;

    return {whole_rating, has_half_rating, empty_rating};
}