const Discord = require('discord.js');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }

});

//DESDE AQUI EMPIEZA A ESCRIBIR EL CODIGO PARA SU BOT
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

var currentUserAttendingID;
var CreatingProject = false;
var CreatingProfile = false;
var firstStage = false;
var secondStage = false;
var thirdStage = false;
var fourthStage = false;
var fiftStage = false;
var registering = true;
var RegisteringSecondPhase = false;
var RegisteringThirdPhase = false;
var RegisteringFourthPhase = false;
var currentUserRegisteringID;
var region;
var profession;
var level;

var commandchannel = 531165786442694662;
var profilechannel = '531477508357357597';
var startchannel = '531924643217539079';
var projectchannel = '531567806412488714';
var projectname = '';
var projectsearching = '';

client.on("ready", () => {
  client.user.setActivity(prefix + "ayuda para ver comandos");
  console.log("Estoy listo!");
  client.channels.get(startchannel).bulkDelete(50);
  client.channels.get(startchannel).send("Hola! ¿De donde eres? \n \n _(Responde con ES (España) o LA (Latinoamérica))_ \n \n _(Escribelo exactamente)_")
});

var prefix = config.prefix;

client.on("message", (message) => {
  
  if (message.content.startsWith(prefix + "gamejam")) {
            message.delete(message.content); //Supposed to delete message
            //message.member.addRole(message.guild.roles.find(r => r.name === "Participante SummerJam #1")).catch(console.error);
            }
  
  if(message.member.roles.some(r=>["Organizador", "Moderador"].includes(r.name)) ) {
            if (message.content.startsWith(prefix + "deletechat confirm")){        
              message.channel.bulkDelete(50);
            }
                if (message.content.startsWith(prefix + "getchannelid"))
            {
              message.delete(message.content);
              message.channel.send(message.channel.id);
            }
  }
      if (message.channel.id == startchannel && (RegisteringSecondPhase == false || RegisteringThirdPhase == false)){
    
            if (message.content.startsWith(prefix + "start")) {
              message.channel.bulkDelete(50);
              client.channels.get(startchannel).send("Hola! ¿De donde eres? \n \n _(Responde con ES (España) o LA (Latinoamérica))_ \n \n _(Escribelo exactamente)_")
            }
      }
        if (registering == true && RegisteringSecondPhase == false && RegisteringThirdPhase == false && message.channel.id == startchannel)
        {
          if (message.content.toUpperCase() == ("ES")){
            registering = false;
            RegisteringSecondPhase = true;
            currentUserRegisteringID = message.author.id;
            message.channel.bulkDelete(50);
            message.channel.send("¿Asi que de España eh? \n ¿Qué rol eres? \n ¿Programador? \n ¿Artista2D? \n ¿Artista3D? \n ¿Musico? \n ¿GameDesigner? \n ¿Tester? (Tambien considerado espectador) \n \n _(Escribelo exactamente)_ \n _(Este mensaje se eliminará en 30 segundos)_")
            .then(function (reply) {
              region = "ES";
                    setTimeout(function(waitforresponse)
                       {
                      if (RegisteringThirdPhase == false){
                          message.channel.bulkDelete(10);
                          client.channels.get(startchannel).send("Hola! ¿De donde eres? \n \n _(Responde con ES (España) o LA (Latinoamérica))_ \n \n _(Escribelo exactamente)_")
                          registering = true;
                          RegisteringSecondPhase = false;
                      }
                       }, 30000)});
          }
          
          else if (message.content.toUpperCase() == ("LA")){
            registering = false;
            RegisteringSecondPhase = true;
            currentUserRegisteringID = message.author.id;
            message.channel.bulkDelete(10);
            message.channel.send("¿Asi que de Latinoamérica eh? \n ¿Qué rol eres? \n ¿Programador? \n ¿Artista2D? \n ¿Artista3D? \n ¿Musico? \n ¿GameDesigner? \n ¿Tester? (También considerado espectador) \n \n _(Escribelo exactamente)_ \n _(Este mensaje se eliminará en 30 segundos)_")
            .then(function (reply) {
              region = "LA";
                    setTimeout(function(waitforresponse)
                       {
                          if (RegisteringThirdPhase == false){
                          message.channel.bulkDelete(10);
                          client.channels.get(startchannel).send("Hola! ¿De donde eres? \n \n _(Responde con ES (España) o LA (Latinoamérica))_ \n \n _(Escribelo exactamente)_")
                          registering = true;
                          RegisteringSecondPhase = false;
                          }
                       }, 30000)});
          }
        }
    
  if (RegisteringThirdPhase == true)
    {
      if (currentUserRegisteringID == message.author.id){
        if(message.content == "1" || message.content == "2" || message.content == "3" || message.content == "4" || message.content == "5")
           {
             message.channel.bulkDelete(10);
              message.channel.send("¿" + profession + "? Vale, ahora te asignaremos tu rol")
              .then(function (reply) {
                      setTimeout(function(waitforresponse)
                         {
                            if (RegisteringFourthPhase == false){
                            message.channel.bulkDelete(10);
                            message.member.addRole(message.guild.roles.find(r => r.name === profession)).catch(console.error);
                            message.member.addRole(message.guild.roles.find(r => r.name === profession)).catch(console.error);
                            message.member.setNickname('['+ region + "." + message.content +']' + " " + message.author.username + " {" + profession + "}", "").catch(console.error);
                            RegisteringThirdPhase = false;
                            client.channels.get(startchannel).send("Hola! ¿De donde eres? \n \n _(Responde con ES (España) o LA (Latinoamérica))_ \n \n _(Escribelo exactamente)_")
                            registering = true;
                            }
                         }, 2500)});
           }
       }
    }
        if (message.author.id != client.user.id && message.channel.id == startchannel)
        {
          if (message.content.toUpperCase() == ("ES") || message.content.toUpperCase() == ("LA") || message.content.toUpperCase() == ("PROGRAMADOR") || message.content.toUpperCase() == ("ARTISTA3D") || message.content.toUpperCase() == ("ARTISTA2D") || message.content.toUpperCase() == ("MUSICO") || message.content.toUpperCase() == ("GAMEDESIGNER") || message.content.toUpperCase() == ("TESTER") || message.content.toUpperCase() == ("1") || message.content.toUpperCase() == ("2") || message.content.toUpperCase() == ("3") || message.content.toUpperCase() == ("4") || message.content.toUpperCase() == ("5")){
          
          }
          else
          {
            message.delete(message.content);
          message.reply('Por favor, no envies mensajes que no corresponden aqui, responde exactamente lo que digo yo, el bot.')
          .then(function (reply) {
                    setTimeout(function(waitforresponse)
                       {
                      reply.delete(reply.content);                  
                       }, 2500)});
          }
        }
        if ((RegisteringSecondPhase == true || RegisteringThirdPhase == true) && message.author.id != client.user.id && currentUserRegisteringID != message.author.id && message.channel.id == startchannel)
        {
          message.delete(message.content);
          message.reply('Lo siento estoy ocupado, espera que acabe de registrar a un compañero')
          .then(function (reply) {
                    setTimeout(function(waitforresponse)
                       {
                      reply.delete(reply.content);                  
                       }, 2500)});
        }
    if (RegisteringSecondPhase == true)
    {
    if (currentUserRegisteringID == message.author.id){
          if (message.content.toUpperCase() == ("PROGRAMADOR")){
            RegisteringSecondPhase = false;
            RegisteringThirdPhase = true;
            message.channel.bulkDelete(10);
            message.channel.send("¿Programador? ¿Que nivel tienes del 1 al 5? \n \n _(Escribelo exactamente)_ \n _(Este mensaje se eliminará en 30 segundos)_")
            .then(function (reply) {
              profession = message.content.toUpperCase();
                    setTimeout(function(waitforresponse)
                       {
                          if (RegisteringFourthPhase == false){
                          message.channel.bulkDelete(10);
                          client.channels.get(startchannel).send("Hola! ¿De donde eres? \n \n _(Responde con ES (España) o LA (Latinoamérica))_ \n \n _(Escribelo exactamente)_")
                          registering = true;
                          RegisteringThirdPhase = false;
                          }
                       }, 30000)});
          }
      if (message.content.toUpperCase() == ("ARTISTA2D")){
            RegisteringSecondPhase = false;
            RegisteringThirdPhase = true;
            message.channel.bulkDelete(10);
            message.channel.send("¿Artista2D? ¿Que nivel tienes del 1 al 5? \n \n _(Escribelo exactamente)_ \n _(Este mensaje se eliminará en 30 segundos)_")
            .then(function (reply) {
              profession = message.content.toUpperCase();
                    setTimeout(function(waitforresponse)
                       {
                          if (RegisteringFourthPhase == false){
                          message.channel.bulkDelete(10);
                          client.channels.get(startchannel).send("Hola! ¿De donde eres? \n \n _(Responde con ES (España) o LA (Latinoamérica))_ \n \n _(Escribelo exactamente)_")
                          registering = true;
                          RegisteringThirdPhase = false;
                          }
                       }, 30000)});
          }
      if (message.content.toUpperCase() == ("ARTISTA3D")){
            RegisteringSecondPhase = false;
            RegisteringThirdPhase = true;
            message.channel.bulkDelete(10);
            message.channel.send("¿Artista3D? ¿Que nivel tienes del 1 al 5? \n \n _(Escribelo exactamente)_ \n _(Este mensaje se eliminará en 30 segundos)_")
            .then(function (reply) {
              profession = message.content.toUpperCase();
                    setTimeout(function(waitforresponse)
                       {
                          if (RegisteringFourthPhase == false){
                          message.channel.bulkDelete(10);
                          client.channels.get(startchannel).send("Hola! ¿De donde eres? \n \n _(Responde con ES (España) o LA (Latinoamérica))_ \n \n _(Escribelo exactamente)_")
                          registering = true;
                          RegisteringThirdPhase = false;
                          }
                       }, 30000)});
          }
      if (message.content.toUpperCase() == ("MUSICO")){
            RegisteringSecondPhase = false;
            RegisteringThirdPhase = true;
            message.channel.bulkDelete(10);
            message.channel.send("¿Musico? ¿Que nivel tienes del 1 al 5? \n \n _(Escribelo exactamente)_ \n _(Este mensaje se eliminará en 30 segundos)_")
            .then(function (reply) {
              profession = message.content.toUpperCase();
                    setTimeout(function(waitforresponse)
                       {
                          if (RegisteringFourthPhase == false){
                          message.channel.bulkDelete(10);
                          client.channels.get(startchannel).send("Hola! ¿De donde eres? \n \n _(Responde con ES (España) o LA (Latinoamérica))_ \n \n _(Escribelo exactamente)_")
                          registering = true;
                          RegisteringThirdPhase = false;
                          }
                       }, 30000)});
          }
      if (message.content.toUpperCase() == ("GAMEDESIGNER")){
            RegisteringSecondPhase = false;
            RegisteringThirdPhase = true;
            message.channel.bulkDelete(10);
            message.channel.send("¿GameDesigner? ¿Que nivel tienes del 1 al 5? \n \n _(Escribelo exactamente)_ \n _(Este mensaje se eliminará en 30 segundos)_")
            .then(function (reply) {
              profession = message.content.toUpperCase();
                    setTimeout(function(waitforresponse)
                       {
                          if (RegisteringFourthPhase == false){
                          message.channel.bulkDelete(10);
                          client.channels.get(startchannel).send("Hola! ¿De donde eres? \n \n _(Responde con ES (España) o LA (Latinoamérica))_ \n \n _(Escribelo exactamente)_")
                          registering = true;
                          RegisteringThirdPhase = false;
                          }
                       }, 30000)});
          }
      if (message.content.toUpperCase() == ("TESTER")){
            RegisteringSecondPhase = false;
            RegisteringThirdPhase = true;
            message.channel.bulkDelete(10);
            message.channel.send("¿Tester? Vale, ahora te asignaremos tu rol")
            .then(function (reply) {
              profession = message.content.toUpperCase();
                    setTimeout(function(waitforresponse)
                       {
                          if (RegisteringFourthPhase == false){
                          message.channel.bulkDelete(10);
                          message.member.addRole(message.guild.roles.find(r => r.name === "Tester")).catch(console.error);
                          message.member.addRole(message.guild.roles.find(r => r.name === "Tester")).catch(console.error);
                          message.member.setNickname('['+ region +']' + " " + message.author.username + " {Tester}", "").catch();
                          RegisteringThirdPhase = false;
                          client.channels.get(startchannel).send("Hola! ¿De donde eres? \n \n _(Responde con ES (España) o LA (Latinoamérica))_ \n \n _(Escribelo exactamente)_")
                          registering = true;
                          }
                       }, 2500)});
          }
        }
    }
    
  if (message.channel.id != commandchannel)
  {
    if (message.content.startsWith(prefix + "ayuda")){
      message.delete(message.content);
      message.channel.send("Por favor escribe este comando en el canal <#" + commandchannel + ">");
    }
  }
  if (message.channel.id == commandchannel){
    
    if (message.content.startsWith(prefix + "ayuda")) {
            message.delete(message.content); //Supposed to delete message
            message.channel.send('__**Comandos:**__\n'+
                                  '1. __' + prefix + 'añadir__ El bot te pregunta que quieres crear, proyecto o perfil. **Uso:** '+ prefix +'añadir \n' +
                                '2. __' + prefix + 'dar oneforall__ El bot te añade el rol de ONE FOR ALL \n' +
                                '3. __' + prefix + 'quitar oneforall__ El bot te quita el rol de ONE FOR ALL \n' +
                                '4. __' + prefix + 'cambiarnivel__ Te pregunta cual es tu nuevo nivel (Aún no funcional)');
            }
      
    if (message.content.startsWith(prefix + "dar oneforall"))
    {
      message.member.addRole(message.guild.roles.find(r => r.name === "ONE FOR ALL")).catch(console.error);
      message.delete(message.content);
    }
    
    if(message.content.startsWith(prefix + "quitar oneforall"))
    {
      message.member.removeRole(message.guild.roles.find(r => r.nane === "ONE FOR ALL")).catch(console.error);
      message.delete(message.content);
    }
      
  if(message.member.roles.some(r=>["Organizador", "Moderador"].includes(r.name)) ) {
            if (message.content.startsWith(prefix + "deletechat confirm")){        
              message.channel.bulkDelete(50);
           }
    
           if(message.content.startsWith(prefix + "recargar") || message.content.startsWith(prefix + "reload")) {
            console.clear();
            client.destroy()
            client.login(config.token);
            message.delete(message.content);
            message.channel.send("Reloaded");
             return;
            }
    
    if (message.content.startsWith(prefix + "estado ")) {
      message.delete(message.content); //Supposed to delete message
      message.channel.send("Estoy jugando a " + message.content.slice(prefix.length + 7, message.content.length));
      client.user.setActivity(message.content.slice(prefix.length + 7, message.content.length))
    }
      if (message.content.startsWith(prefix + "getchannel")) {
        message.delete(message.content); //Supposed to delete message
        message.channel.send(message.channel.id);
      }
  }
    
        if (message.content.startsWith(prefix +"añadir") && firstStage == false){
            message.channel.bulkDelete(50);
            currentUserAttendingID = message.author.id;
            message.delete(message.content);
            message.reply('Hola, que quieres añadir? \n \n Proyecto \n \n Perfil \n \n _(Responde con la palabra exacta, es decir, Proyecto o Perfil)_ \n _(Este mensaje se eliminará en 30 segundos)_')
                  .then(function (reply) {
                    firstStage = true;
                    setTimeout(function(waitforresponse)
                       {
                      if (firstStage == true){
                      firstStage = false;
                      message.channel.bulkDelete(50);
                      }
                       }, 30000);
                  }).catch(function() {
                    //Something
                   });
        }

        if (CreatingProject == true && currentUserAttendingID == message.author.id)
          {
            CreatingProject = false
            message.channel.bulkDelete(50);  
            projectname = message.content;
            message.channel.send("¿Que tipo de rol estas buscando? \n \n _(Reacciona con el mismo emoji para cancelar)_ \n _(Este mensaje se eliminará en 30 segundos)_")
            .then(function (mensaje) {
              thirdStage = true;
                          mensaje.react('❌')
                      setTimeout(function(waitforresponse)
                         {
                        if (thirdStage == true){
                        thirdStage = false;
                        message.channel.bulkDelete(50);                      
                        }
                         }, 30000);
                    }).catch(function() {
                      //Something
                     });
          }
    
        if (thirdStage == true && currentUserAttendingID == message.author.id)
          {
            thirdStage = false;
            message.channel.bulkDelete(50);  
            projectsearching = message.content;
            message.channel.send("Haz una breve descripción del proyecto \n \n _(Reacciona con el mismo emoji para cancelar)_ \n _(Este mensaje se eliminará en 120 segundos)_")
            .then(function (mensaje) {
              fourthStage = true;
                          mensaje.react('❌')
                      setTimeout(function(waitforresponse)
                         {
                        if (fourthStage == true){
                        fourthStage = false;
                        message.channel.bulkDelete(50);                      
                        }
                         }, 120000);
                    }).catch(function() {
                      //Something
                     });
          }
    if (fourthStage == true && currentUserAttendingID == message.author.id)
              {
              const embed = new Discord.RichEmbed()
              .setAuthor("Created by: " + message.author.username, message.author.avatarURL)
              /*
               * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
               */
              .setColor(0x00AE86)
              //.setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
              .setThumbnail(message.author.avatarURL)
              /*
               * Takes a Date object, defaults to current date.
               */
              .setTimestamp()
              .addField("Nombre del proyecto: ", projectname)
              //.setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
              .addField("Está buscando: ", projectsearching)
              //  "This is a field value, it can hold 1024 characters.")
              /*
               * Inline fields may not display as inline if the thumbnail and/or image is too big.
               */
              .addField("Descripcion del proyecto: ", message.content)
              /*
               * Blank field, useful to create some space.
               */
              //.addBlankField(true)
              //.addField("Inline Field 3", "You can have a maximum of 25 fields.", true);

              client.channels.get(projectchannel).send({embed});
            message.channel.bulkDelete(50);
            fourthStage = false;
          }
        if (CreatingProfile == true && currentUserAttendingID == message.author.id)
          {
            
              message.channel.bulkDelete(2);

              const embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription(message.content)
                /*
                 * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                 */
                .setColor(0x00AE86)
                //.setDescription(message.content)
                //.setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
                .setThumbnail(message.author.avatarURL)
                /*
                 * Takes a Date object, defaults to current date.
                 */
                .setTimestamp()
                //.setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
                //.addField(message.content)
                //  "This is a field value, it can hold 1024 characters.")
                /*
                 * Inline fields may not display as inline if the thumbnail and/or image is too big.
                 */
                //.addField("Inline Field", "They can also be inline.", true)
                /*
                 * Blank field, useful to create some space.
                 */
                //.addBlankField(true)
                //.addField("Inline Field 3", "You can have a maximum of 25 fields.", true);

                client.channels.get(profilechannel).send({embed});
              CreatingProfile = false;
              secondStage = false;
          }
    
    if ((firstStage == true || secondStage == true || thirdStage == true || CreatingProfile == true || CreatingProject == true) && message.author.id != client.user.id && message.channel.id == commandchannel)
        {
          if(currentUserAttendingID != message.author.id){
          message.delete(message.content);
          message.reply('Lo siento estoy ocupado, espera que acabe de hablar con un compañero')
          .then(function (reply) {
                    setTimeout(function(waitforresponse)
                       {
                      reply.delete(reply.content);                  
                       }, 2500)});
          }
        }
    
        if ((message.content == "Proyecto" || message.content == "proyecto") && firstStage == true && currentUserAttendingID == message.author.id){
          message.delete;
          firstStage = false;
          message.channel.send("¿Asi que quieres crear un Proyecto? ¿Como se llama? \n \n _(Reacciona con el mismo emoji para cancelar)_ \n _(Este mensaje se eliminará en 30 segundos)_")
          .then(function (mensaje) {
            secondStage = true;
                        mensaje.react('❌')
                    setTimeout(function(waitforresponse)
                       {
                      if (secondStage == true){
                      secondStage = false;
                      message.channel.bulkDelete(50);                      
                      }
                       }, 30000);
                  }).catch(function() {
                    //Something
                   });
          CreatingProject = true;
        }

        if ((message.content == "Perfil" || message.content == "perfil") && firstStage == true && currentUserAttendingID == message.author.id){
          message.channel.bulkDelete(2);
          firstStage = false;
          message.channel.send("¿Asi que quieres crear un perfil? Haz una breve descripción sobre ti y dime en que tipo de proyectos tienes preferencia \n \n _(Reacciona con el mismo emoji para cancelar)_ \n _(Este mensaje se eliminará en 60 segundos)_")
          .then(function (mensaje) {
            secondStage = true;
            mensaje.react('❌')
                    setTimeout(function(waitforresponse)
                       {
                      if (secondStage == true){
                      secondStage = false;
                          message.channel.bulkDelete(50);
                      }
                       }, 60000);
                  }).catch(function() {
                    //Something
                   });
          CreatingProfile = true;
        }
  }});


  
    client.on('messageReactionAdd', (reaction, usuario) => {
      if ((reaction.message == "¿Asi que quieres crear un Proyecto? ¿Como se llama? \n \n _(Reacciona con el mismo emoji para cancelar)_ \n _(Este mensaje se eliminará en 30 segundos)_" ||
           reaction.message == "¿Que tipo de rol estas buscando? \n \n _(Reacciona con el mismo emoji para cancelar)_ \n _(Este mensaje se eliminará en 30 segundos)_" ||
           reaction.message == "Haz una breve descripción del proyecto \n \n _(Reacciona con el mismo emoji para cancelar)_ \n _(Este mensaje se eliminará en 120 segundos)_" ||
           reaction.message == "¿Asi que quieres crear un perfil? Haz una breve descripción sobre ti y dime en que tipo de proyectos tienes preferencia \n \n _(Reacciona con el mismo emoji para cancelar)_ \n _(Este mensaje se eliminará en 60 segundos)_")
          && reaction.message.author.id == client.user.id && usuario.id == currentUserAttendingID && reaction.emoji == "❌") 
      {
        reaction.message.delete(reaction.message.content);
        reaction.message.channel.send("Proyecto cancelado")
              .then(function (mensaje) {
            secondStage = true;
                    setTimeout(function(waitforresponse)
                       {
                      reaction.message.channel.bulkDelete(50);
                      CreatingProject = false;
                      secondStage = false;
                      thirdStage = false;
                      fourthStage = false;
                       firstStage = false;
                      fiftStage = false;
                      }, 1000)});      }
      
      if (reaction.message == "¿Asi que quieres crear un perfil? Haz una breve descripción sobre ti y dime en que tipo de proyectos tienes preferencia \n \n _(Reacciona con el mismo emoji para cancelar)_ \n _(Este mensaje se eliminará en 120 segundos)_" && reaction.message.author.id == client.user.id && usuario.id == currentUserAttendingID && reaction.emoji == "❌") 
      {
        reaction.message.delete(reaction.message.content);
        reaction.message.channel.send("Perfil cancelado")
              .then(function (mensaje) {
            secondStage = true;
                    setTimeout(function(waitforresponse)
                       {
                      reaction.message.channel.bulkDelete(50);
                      CreatingProfile = false;
                      secondStage = false;
                       }, 1000)});
      }
    });


client.login(process.env.BOT_TOKEN);
