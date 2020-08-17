const vscode = require('vscode');
const sqlFormatter = require("./sqlFormatter");

const getSetting = (group, key, def) => {
	const settings = vscode.workspace.getConfiguration(group, null);
	const editor = vscode.window.activeTextEditor;
	const language = editor && editor.document && editor.document.languageId;
	const languageSettings = language && vscode.workspace.getConfiguration(null, null).get(`[${language}]`);
	let value = languageSettings && languageSettings[`${group}.${key}`];
	if (value == null) value = settings.get(key, def);
	return value == null ? def : value;
};

const getConfig = ({ insertSpaces, tabSize }) => ({
	indent: insertSpaces ? ' '.repeat(tabSize) : '\t',
	language: getSetting('sql-formatter', 'dialect', 'mscope'),
	uppercase: getSetting('sql-formatter', 'uppercase', true),
	linesBetweenQueries: getSetting('sql-formatter', 'linesBetweenQueries', 1)
});

const format = (text, config) => {
	return sqlFormatter.format(text, config);
};

module.exports.activate = () => {
	vscode.languages.registerDocumentRangeFormattingEditProvider('mscope', {
		provideDocumentRangeFormattingEdits: (document, range, options) => [
			vscode.TextEdit.replace(range, format(document.getText(range), getConfig(options)))
		]
	});

	vscode.languages.registerDocumentRangeFormattingEditProvider('scope', {
		provideDocumentRangeFormattingEdits: (document, range, options) => [
			vscode.TextEdit.replace(range, format(document.getText(range), getConfig(options)))
		]
	});
}