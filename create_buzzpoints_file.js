const fs = require('fs');
const path = require('path');
const _ = require('radash');

const tournamentsPath = './tournaments';

fs.readdir(tournamentsPath, (err, subFolders) => {
    if (err) {
        console.error('Error reading tournament folders: ', err);
        return;
    }

    subFolders.forEach((subFolder) => {
        const subFolderPath = path.join(tournamentsPath, subFolder);

        const indexPath = path.join(subFolderPath, 'index.json');

        if (!fs.existsSync(indexPath)) {
            console.log(`Skipping ${subFolder} as 'index.json' file not found.`);
            return;
        }

        fs.readFile(indexPath, 'utf8', (err, tournamentData) => {
            if (err) {
                console.error(`Error reading ${indexPath}:`, err);
                return;
            }

            try {
                const roundDictionary = {};
                const tournament = JSON.parse(tournamentData);
                const gameFilesPath = path.join(subFolderPath, 'game_files');

                if (!fs.existsSync(gameFilesPath)) {
                    console.log(`Skipping ${subFolder} as 'game_files' folder not found.`);
                    return;
                }

                fs.readdir(gameFilesPath, (err, gameFiles) => {
                    if (err) {
                        console.error(`Error reading files in ${gameFilesPath}:`, err);
                        return;
                    }

                    const buzzes = [];
                    const bonuses = [];

                    gameFiles.forEach((gameFile) => {
                        const gameFilePath = path.join(gameFilesPath, gameFile);

                        fs.readFile(gameFilePath, 'utf8', (err, gameDataContent) => {
                            if (err) {
                                console.error(`Error reading ${gameFilePath}:`, err);
                                return;
                            }

                            try {
                                const gameDataObj = JSON.parse(gameDataContent);
                                buzzes.push(gameDataObj);
                            } catch (err) {
                                console.error(`Error parsing JSON in ${gameFilePath}:`, err);
                            }
                        });
                    });

                    tournament.buzzes = buzzes;
                    tournament.bonuses = bonuses;
                    tournament.rounds = _.listify(roundDictionary, (key, value) => ({
                        round: key,
                        packet: value
                    }));

                    fs.writeFile(indexPath, JSON.stringify(tournament, null, 2), (err) => {
                        if (err) {
                            console.error(`Error writing to ${indexPath}:`, err);
                            return;
                        }

                        console.log(`Updated ${indexPath} successfully.`);
                    });
                });
            } catch (err) {
                console.error(`Error parsing JSON in ${indexPath}:`, err);
            }
        });
    });
});