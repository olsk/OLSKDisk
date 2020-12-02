const assert = require('assert');

const mainModule = require('./main');

const pathPackage = require('path');

const kTesting = {
	StubRoot: function (inputData) {
		return pathPackage.join(__dirname, '__testing', mainModule.OLSKDiskWorkspaceTestingFolderSubfolderNameFor('os.filesystem'), inputData || '');
	},
};

describe('OLSKDiskIsRealFolderPath', function test_OLSKDiskIsRealFolderPath() {

	beforeEach(function() {
		mainModule.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('returns false if not real', function() {
		assert.strictEqual(mainModule.OLSKDiskIsRealFolderPath(kTesting.StubRoot('alfa')), false);
	});

	it('returns false if not folder', function() {
		assert.strictEqual(mainModule.OLSKDiskIsRealFolderPath(mainModule.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), '')), false);
	});

	it('returns true', function() {
		assert.strictEqual(mainModule.OLSKDiskIsRealFolderPath(mainModule.OLSKDiskCreateFolder(kTesting.StubRoot())), true);
	});

});

describe('OLSKDiskIsRealFilePath', function test_OLSKDiskIsRealFilePath() {

	beforeEach(function() {
		mainModule.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('returns false if not real', function() {
		assert.strictEqual(mainModule.OLSKDiskIsRealFilePath(kTesting.StubRoot('alfa.txt')), false);
	});

	it('returns false if not file', function() {
		assert.strictEqual(mainModule.OLSKDiskIsRealFilePath(mainModule.OLSKDiskCreateFolder(kTesting.StubRoot('alfa'))), false);
	});

	it('returns true', function() {
		assert.strictEqual(mainModule.OLSKDiskIsRealFilePath(mainModule.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), '')), true);
	});

});

describe('OLSKDiskCreateFolder', function test_OLSKDiskCreateFolder() {

	beforeEach(function() {
		mainModule.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('throws if not string', function() {
		assert.throws(function () {
			mainModule.OLSKDiskCreateFolder(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if real file', function() {
		assert.throws(function () {
			mainModule.OLSKDiskCreateFolder(mainModule.OLSKDiskWriteFile(kTesting.StubRoot('alfa'), ''));
		}, /OLSKErrorInputNotValid/);
	});

	it('returns inputData', function() {
		assert.strictEqual(mainModule.OLSKDiskCreateFolder(kTesting.StubRoot('alfa')), kTesting.StubRoot('alfa'));
	});

	it('creates folder', function() {
		assert.strictEqual(mainModule.OLSKDiskIsRealFolderPath(kTesting.StubRoot('alfa/bravo')), false);
		assert.strictEqual(mainModule.OLSKDiskIsRealFolderPath(mainModule.OLSKDiskCreateFolder(kTesting.StubRoot('alfa/bravo'))), true);
	});

});

describe('OLSKDiskDeleteFolder', function test_OLSKDiskDeleteFolder() {

	beforeEach(function() {
		mainModule.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('throws if not string', function() {
		assert.throws(function () {
			mainModule.OLSKDiskDeleteFolder(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns inputData', function() {
		assert.strictEqual(mainModule.OLSKDiskDeleteFolder(mainModule.OLSKDiskCreateFolder(kTesting.StubRoot('alfa'))), kTesting.StubRoot('alfa'));
	});

	it('deletes folder', function() {
		assert.strictEqual(mainModule.OLSKDiskIsRealFolderPath(mainModule.OLSKDiskDeleteFolder(mainModule.OLSKDiskCreateFolder(kTesting.StubRoot('alfa')))), false);
	});

});

describe('OLSKDiskWriteFile', function test_OLSKDiskWriteFile() {

	beforeEach(function() {
		mainModule.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('throws if param1 not string', function() {
		assert.throws(function () {
			mainModule.OLSKDiskWriteFile(null, '');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not string', function() {
		assert.throws(function () {
			mainModule.OLSKDiskWriteFile('', null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns param1', function() {
		assert.strictEqual(mainModule.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), ''), kTesting.StubRoot('alfa.txt'));
	});

	it('creates parent folders if not real', function() {
		assert.strictEqual(mainModule.OLSKDiskIsRealFolderPath(kTesting.StubRoot('alfa'), ''), false);
		assert.strictEqual(mainModule.OLSKDiskIsRealFolderPath(pathPackage.dirname(mainModule.OLSKDiskWriteFile(kTesting.StubRoot('alfa/bravo.txt'), ''))), true);
	});

	it('creates file if not real', function() {
		assert.strictEqual(mainModule.OLSKDiskIsRealFilePath(kTesting.StubRoot('alfa.txt'), ''), false);
		assert.strictEqual(mainModule.OLSKDiskIsRealFilePath(mainModule.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), '')), true);
	});

	it('updates content', function() {
		assert.strictEqual(mainModule.OLSKDiskReadFile(mainModule.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), 'bravo')), 'bravo');
		assert.strictEqual(mainModule.OLSKDiskReadFile(mainModule.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), 'charlie')), 'charlie');
	});

});

describe('OLSKDiskReadFile', function test_OLSKDiskReadFile() {

	beforeEach(function() {
		mainModule.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('throws if not string', function() {
		assert.throws(function () {
			mainModule.OLSKDiskReadFile(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if not real path', function() {
		assert.throws(function () {
			mainModule.OLSKDiskReadFile('alfa.txt');
		}, /OLSKErrorInputNotValid/);
	});

	it('returns content', function() {
		assert.strictEqual(mainModule.OLSKDiskReadFile(mainModule.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), 'bravo')), 'bravo');
	});

});

describe('OLSKDiskAppFolderName', function test_OLSKDiskAppFolderName() {

	it('returns constant', function() {
		assert.strictEqual(mainModule.OLSKDiskAppFolderName(), 'os-app');
	});

});

describe('OLSKDiskWorkspaceTestingFolderSubfolderNameFor', function test_OLSKDiskWorkspaceTestingFolderSubfolderNameFor() {

	it('throws error if not string', function() {
		assert.throws(function() {
			mainModule.OLSKDiskWorkspaceTestingFolderSubfolderNameFor(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws error if empty', function() {
		assert.throws(function() {
			mainModule.OLSKDiskWorkspaceTestingFolderSubfolderNameFor('');
		}, /OLSKErrorInputNotValid/);
	});

	it('returns string', function() {
		assert.strictEqual(mainModule.OLSKDiskWorkspaceTestingFolderSubfolderNameFor('os-alfa'), 'test-os-alfa');
		assert.strictEqual(mainModule.OLSKDiskWorkspaceTestingFolderSubfolderNameFor('os-bravo.charlie'), 'test-os-bravo-charlie');
	});

});

describe('OLSKDiskSafeBasenameFor', function test_OLSKDiskSafeBasenameFor() {

	it('throws if not string', function() {
		assert.throws(function() {
			mainModule.OLSKDiskSafeBasenameFor(null);
		});
	});

	it('returns string', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alfa'), 'alfa');
	});

	it('removes Dot', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alfa.bravo'), 'alfa bravo');
	});

	it('removes Comma', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alfa,bravo'), 'alfa bravo');
	});

	it('removes Semicolon', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alfa;bravo'), 'alfa bravo');
	});

	it('removes Colon', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alfa:bravo'), 'alfa bravo');
	});

	it('removes Star', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alfa*bravo'), 'alfa bravo');
	});

	it('removes Question', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alfa?bravo'), 'alfa bravo');
	});

	it('removes Pipeline', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alfa|bravo'), 'alfa bravo');
	});

	it('removes Underscore', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alfa_bravo'), 'alfa bravo');
	});

	it('removes GreaterLessThan', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alfa<bravo>charlie'), 'alfa bravo charlie');
	});

	it('removes Slashes', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alfa/bravo\\charlie'), 'alfa bravo charlie');
	});

	it('removes Quotes', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('"alfa" \'bravo\' “charlie” ‘delta’ «echo»'), 'alfa bravo charlie delta echo');
	});

	it('removes Whitespace', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alfa\nbravo\tcharlie'), 'alfa bravo charlie');
	});

	it('removes DisallowedMultiple', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alfa \n\t bravo'), 'alfa bravo');
	});

	it('removes DisallowedEnds', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor(' \n\t alfa bravo \t\n '), 'alfa bravo');
	});

	it('removes Dashes', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alfa-bravo–charlie—delta'), 'alfa-bravo–charlie—delta');
	});

	it('removes Brackets', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('(alfa) [bravo] {charlie}'), '(alfa) [bravo] {charlie}');
	});

	it('removes International', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('àlpha niño 縦書き 😀 € $'), 'àlpha niño 縦書き 😀 € $');
	});

});
