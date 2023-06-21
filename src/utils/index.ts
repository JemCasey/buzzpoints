export const slugify = (text:string) => text.replaceAll(' ', '-').replace(/\W/g, '').toLowerCase().trim();
export const sanitize = (text:string) => text.replace(/ *\([^)]*\)/g, "").trim();
export const shortenAnswerline = (answerline:string) => answerline.split("[")[0].replace(/ *\([^)]*\)/g, "").trim();
export const removeTags = (text:string) => text.replace( /(<([^>]+)>)/ig, '');

export const formatPercent = (v:any) => v?.toLocaleString('en-US', { style: 'percent' });
export const formatDecimal = (v:any) => v?.toFixed(2);