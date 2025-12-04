import fetch from 'node-fetch';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const id = req.query.user || 'KGJN53';
    const url = `https://kirka.io/profile/${id}`;

    const resp = await fetch(url);
    const html = await resp.text();
    const $ = cheerio.load(html);

    const items = [];

    $('.inventory-item, .item, .inv-item').each((i, el) => {
      const name = $(el).find('.item-name').text().trim();
      const img = $(el).find('img').attr('src');
      const rarity = $(el).find('.item-rarity').text().trim();
      items.push({ name, img, rarity });
    });

    res.status(200).json({ id, items });
  } catch (e) {
    res.status(500).json({ error: true, msg: e.message });
  }
}