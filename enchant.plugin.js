// ==UserScript==
// @name         GalacticTranslator
// @version      0.0.1
// @description  Translate messages from Galactic alphabet to Latin alphabet.
// @license      MIT
// @author       YourName
// @homepage     https://github.com/YourGitHub/GalacticTranslator
// @source       https://github.com/YourGitHub/GalacticTranslator/blob/main/GalacticTranslator.plugin.js
// @invite       YourDiscordInvite
// @donate       YourDonateLink
// ==/UserScript==

module.exports = (() => {
    const config = {
        info: {
            name: "GalacticTranslator",
            authors: [
                {
                    name: "YourName",
                    discord_id: "YourDiscordID"
                }
            ],
            version: "0.0.1",
            description: "Translate messages from Galactic alphabet to Latin alphabet.",
            github: "https://github.com/YourGitHub/GalacticTranslator",
            github_raw: "https://raw.githubusercontent.com/YourGitHub/GalacticTranslator/main/GalacticTranslator.plugin.js"
        },
        changelog: [
            {
                title: "Initial Release",
                type: "added",
                items: ["Plugin released."]
            }
        ],
        main: "index.js"
    };

    return !global.ZeresPluginLibrary ? class {
        constructor() {
            this._config = config;
        }

        getName() {
            return config.info.name;
        }

        getAuthor() {
            return config.info.authors.map(a => a.name).join(", ");
        }

        getDescription() {
            return config.info.description;
        }

        getVersion() {
            return config.info.version;
        }

        load() {
            BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: "Download Now",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error)
                            return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
        }

        start() { }
        stop() { }
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {
            const { DiscordModules, Patcher } = Api;

            const galacticAlphabet = {
                'ᔑ': 'a',
                'ʖ': 'b',
                'ᓵ': 'c',
                '↸': 'd',
                'ᒷ': 'e',
                '⎓': 'f',
                '⊣': 'g',
                '⍑': 'h',
                '╎': 'i',
                '⋮': 'j',
                'ꖌ': 'k',
                'ꖎ': 'l',
                'ᒲ': 'm',
                'リ': 'n',
                '𝙹': 'o',
                '!¡': 'p',
                'ᑑ': 'q',
                '∷': 'r',
                'ᓭ': 's',
                'ℸ ̣': 't',
                '⚍': 'u',
                '⍊': 'v',
                '∴': 'w',
                ' ̇/': 'x',
                '||': 'y',
                '⨅': 'z'
            };

            return class GalacticTranslator extends Plugin {
                onStart() {
                    Patcher.before(DiscordModules.MessageActions, "sendMessage", (_, [, message]) => {
                        if (message.content) {
                            message.content = this.translateMessage(message.content);
                        }
                    });
                }

                onStop() {
                    Patcher.unpatchAll();
                }

                translateMessage(message) {
                    return message
                        .split('')
                        .map(char => galacticAlphabet[char] || char)
                        .join('');
                }
            };
        };

        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
