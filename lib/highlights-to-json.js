// Modified code found from https://github.com/sawyerh/kindle-email-to-json
const cheerio = require("cheerio");

/**
 * Convert email HTML into JSON
 * @param {String} html
 * @returns {Object}
 */
const Converter = function (html) {
  this.html = html;
  this.$ = cheerio.load(this.html);
};

/**
 * Determine whether the given HTML is a valid Kindle notes export
 * @returns {Boolean}
 */
Converter.prototype.valid = function () {
  if (this.html) {
    const notes = this.$(".noteText");
    return notes.length > 0;
  }

  return false;
};

/**
 * Parse the HTML to pull out the volume's title, author, and highlights
 * @returns {Object}
 */
Converter.prototype.getJSON = function () {
  const titleEl = this.$(".bookTitle");
  const authorEl = this.$(".authors");
  const title = titleEl.text().trim();
  const authors = authorEl
    .text()
    .split(";")
    .map((s) => s.trim());

  return {
    volume: {
      title: title,
      authors: authors,
    },
    highlights: this.highlights(),
  };
};

/**
 * Parse the highlights and notes from the HTML
 * @returns {Array} highlights
 */
Converter.prototype.highlights = function () {
  const headings = this.$(".noteHeading");
  let highlights = [];

  headings.each((_index, el) => {
    const heading = this.$(el);
    const color = heading.find("span[class^='highlight_']").text().trim();
    const text = heading.text().trim();

    const location = text.match(/\s(\d*)$/i) || "";

    // We need to differentiate between a "highlight" and a "note." The heading
    // for the latter case doesn't have a color element as a child
    if (!color && highlights.length) {
      // We're making the assumption that notes are only added on top of
      // a highlight. When that's the case, the exported file will include
      // the note directly after the text it's added on.
      const highlight = highlights[highlights.length - 1];
      highlight.notes = this.highlightContent(location[1], color, el);
    } else {
      highlights = highlights.concat(
        this.highlightContent(location[1], color, el)
      );
    }
  });

  return highlights;
};

/**
 * Find the next note text after the given element
 * @param  {String} location - The highlight location
 * @param  {String} color
 * @param  {Node} el
 * @return {Array} The parsed highlight objects
 */
Converter.prototype.highlightContent = function (location, color, el) {
  let highlights = [];
  const nextEl = this.$(el).next();

  if (nextEl.hasClass("noteText")) {
    const highlight = {
      color: color,
      content: this.$(nextEl).text().trim(),
      location: location,
    };

    highlights.push(highlight);

    if (nextEl.next().hasClass("noteText"))
      highlights = highlights.concat(
        this.highlightContent(location, color, nextEl)
      );
  }

  return highlights;
};

/**
 * @param {String} contents - HTML attachment content
 * @returns {Object}
 */
function convert(contents) {
  const converter = new Converter(contents);

  if (converter.valid) {
    return converter.getJSON();
  }

  throw new Error("Email not in compatible format for parsing");
}

/**
 * Convert a Kindle notes email export into a JSON object. Rejects
 * if the mail isn't a valid Kindle notes export. The email is
 * expected to contain at least one HTML attachment.
 * @param {import("mailparser").Source} source
 * @returns {Promise<Object>}
 */
function toJSON(source) {
  return convert(source);
}

module.exports = toJSON;
