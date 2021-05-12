let rps = ["**:moyai: pierre**", "**:pencil: papier**", "**:scissors: ciseaux**"]; //let's check rock , papper , scissors with its icons
function random() { return `${rps[Math.floor(Math.random() * rps.length)]}!` } //The bot starts collecting information about what we gave about icons and names
exports.run = (client, msg, args) => { //let's started
    let choice = args.join(" ").toLowerCase(); //To extract the available choice of rps
    if (choice === '') return msg.reply("❌ ERROR! , Merci de suivre cette exemple +rps pierre , papier , ciseaux ."); //wait a second to load all the choice that available
    if (choice !== "pierre" && choice !== "papier" && choice !== "ciseaux") return msg.reply(`Merci de choisir un argument valide. ${choice} n'est pas valide (utiliser: pierre , papier , ciseaux) :P`); //If rps is found ; The bot will reply you a rock, papper, or scissors And if what you have choice is not available, it will reply with
    msg.reply(random()); // random : The bot will choose either a rock or a paper or a scissors
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [], //Leave it empty as better
  permLevel: 0
};

exports.help = {
  name: 'rps', //your command name
  description: 'Pierre, Papier, Ciseaux.', //your command description
  usage: 'rps' //how did it work
};