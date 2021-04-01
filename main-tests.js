const assert = require('assert');

const mod = require('./main');

const pathPackage = require('path');

const kTesting = {
	StubRoot: function (inputData) {
		return pathPackage.join(__dirname, '__testing', mod.OLSKDiskWorkspaceTestingFolderSubfolderNameFor('os.filesystem'), inputData || '');
	},
};

describe('OLSKDiskIsRealFolderPath', function test_OLSKDiskIsRealFolderPath() {

	beforeEach(function() {
		mod.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('returns false if not real', function() {
		assert.strictEqual(mod.OLSKDiskIsRealFolderPath(kTesting.StubRoot('alfa')), false);
	});

	it('returns false if not folder', function() {
		assert.strictEqual(mod.OLSKDiskIsRealFolderPath(mod.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), '')), false);
	});

	it('returns true', function() {
		assert.strictEqual(mod.OLSKDiskIsRealFolderPath(mod.OLSKDiskCreateFolder(kTesting.StubRoot())), true);
	});

});

describe('OLSKDiskIsRealFilePath', function test_OLSKDiskIsRealFilePath() {

	beforeEach(function() {
		mod.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('returns false if not real', function() {
		assert.strictEqual(mod.OLSKDiskIsRealFilePath(kTesting.StubRoot('alfa.txt')), false);
	});

	it('returns false if not file', function() {
		assert.strictEqual(mod.OLSKDiskIsRealFilePath(mod.OLSKDiskCreateFolder(kTesting.StubRoot('alfa'))), false);
	});

	it('returns true', function() {
		assert.strictEqual(mod.OLSKDiskIsRealFilePath(mod.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), '')), true);
	});

});

describe('OLSKDiskCreateFolder', function test_OLSKDiskCreateFolder() {

	beforeEach(function() {
		mod.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('throws if not string', function() {
		assert.throws(function () {
			mod.OLSKDiskCreateFolder(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if real file', function() {
		assert.throws(function () {
			mod.OLSKDiskCreateFolder(mod.OLSKDiskWriteFile(kTesting.StubRoot('alfa'), ''));
		}, /OLSKErrorInputNotValid/);
	});

	it('returns inputData', function() {
		assert.strictEqual(mod.OLSKDiskCreateFolder(kTesting.StubRoot('alfa')), kTesting.StubRoot('alfa'));
	});

	it('creates folder', function() {
		assert.strictEqual(mod.OLSKDiskIsRealFolderPath(kTesting.StubRoot('alfa/bravo')), false);
		assert.strictEqual(mod.OLSKDiskIsRealFolderPath(mod.OLSKDiskCreateFolder(kTesting.StubRoot('alfa/bravo'))), true);
	});

});

describe('OLSKDiskDeleteFolder', function test_OLSKDiskDeleteFolder() {

	beforeEach(function() {
		mod.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('throws if not string', function() {
		assert.throws(function () {
			mod.OLSKDiskDeleteFolder(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns inputData', function() {
		assert.strictEqual(mod.OLSKDiskDeleteFolder(mod.OLSKDiskCreateFolder(kTesting.StubRoot('alfa'))), kTesting.StubRoot('alfa'));
	});

	it('deletes folder', function() {
		assert.strictEqual(mod.OLSKDiskIsRealFolderPath(mod.OLSKDiskDeleteFolder(mod.OLSKDiskCreateFolder(kTesting.StubRoot('alfa')))), false);
	});

});

describe('OLSKDiskWriteFile', function test_OLSKDiskWriteFile() {

	beforeEach(function() {
		mod.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('throws if param1 not string', function() {
		assert.throws(function () {
			mod.OLSKDiskWriteFile(null, '');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not string', function() {
		assert.throws(function () {
			mod.OLSKDiskWriteFile('', null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns param1', function() {
		assert.strictEqual(mod.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), ''), kTesting.StubRoot('alfa.txt'));
	});

	it('creates parent folders if not real', function() {
		assert.strictEqual(mod.OLSKDiskIsRealFolderPath(kTesting.StubRoot('alfa'), ''), false);
		assert.strictEqual(mod.OLSKDiskIsRealFolderPath(pathPackage.dirname(mod.OLSKDiskWriteFile(kTesting.StubRoot('alfa/bravo.txt'), ''))), true);
	});

	it('creates file if not real', function() {
		assert.strictEqual(mod.OLSKDiskIsRealFilePath(kTesting.StubRoot('alfa.txt'), ''), false);
		assert.strictEqual(mod.OLSKDiskIsRealFilePath(mod.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), '')), true);
	});

	it('updates content', function() {
		assert.strictEqual(mod.OLSKDiskReadFile(mod.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), 'bravo')), 'bravo');
		assert.strictEqual(mod.OLSKDiskReadFile(mod.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), 'charlie')), 'charlie');
	});

});

describe('OLSKDiskReadFile', function test_OLSKDiskReadFile() {

	beforeEach(function() {
		mod.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('throws if not string', function() {
		assert.throws(function () {
			mod.OLSKDiskReadFile(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if not real path', function() {
		assert.throws(function () {
			mod.OLSKDiskReadFile('alfa.txt');
		}, /OLSKErrorInputNotValid/);
	});

	it('returns content', function() {
		assert.strictEqual(mod.OLSKDiskReadFile(mod.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), 'bravo')), 'bravo');
	});

});

describe('OLSKDiskWrite', function test_OLSKDiskWrite() {

	beforeEach(function() {
		mod.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('throws if param1 not string', function() {
		assert.throws(function () {
			mod.OLSKDiskWrite(null, Math.random().toString());
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not string', function() {
		assert.throws(function () {
			mod.OLSKDiskWrite(Math.random().toString(), null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns param2', function() {
		const item = Math.random().toString();
		assert.strictEqual(mod.OLSKDiskWrite(kTesting.StubRoot(Math.random().toString()), item), item);
	});

	it('creates parent folders if not real', function() {
		const folder = Math.random().toString();
		const path = kTesting.StubRoot(folder + '/' + Math.random().toString());

		assert.strictEqual(mod.OLSKDiskIsRealFolderPath(kTesting.StubRoot(folder)), false);

		mod.OLSKDiskWrite(path, Math.random().toString());
		assert.strictEqual(mod.OLSKDiskIsRealFolderPath(pathPackage.dirname(path)), true);
	});

	it('creates file if not real', function() {
		const item = kTesting.StubRoot(Math.random().toString());
		assert.strictEqual(mod.OLSKDiskIsRealFilePath(item), false);

		mod.OLSKDiskWrite(item, Math.random().toString());
		assert.strictEqual(mod.OLSKDiskIsRealFilePath(item), true);
	});

	it('updates content', function() {
		const item = kTesting.StubRoot(Math.random().toString());

		mod.OLSKDiskWrite(item, 'bravo');
		assert.strictEqual(mod.OLSKDiskReadFile(item), 'bravo');

		mod.OLSKDiskWrite(item, 'charlie');
		assert.strictEqual(mod.OLSKDiskReadFile(item), 'charlie');
	});

});

describe('OLSKDiskRead', function test_OLSKDiskRead() {

	beforeEach(function() {
		mod.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('throws if not string', function() {
		assert.throws(function () {
			mod.OLSKDiskRead(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns null if not real path', function() {
		assert.strictEqual(mod.OLSKDiskRead(Math.random().toString()), null);
	});

	it('returns content', function() {
		assert.strictEqual(mod.OLSKDiskRead(mod.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), 'bravo')), 'bravo');
	});

});

describe('OLSKDiskAppFolderName', function test_OLSKDiskAppFolderName() {

	it('returns constant', function() {
		assert.strictEqual(mod.OLSKDiskAppFolderName(), 'os-app');
	});

});

describe('OLSKDiskWorkspaceTestingFolderSubfolderNameFor', function test_OLSKDiskWorkspaceTestingFolderSubfolderNameFor() {

	it('throws error if not string', function() {
		assert.throws(function() {
			mod.OLSKDiskWorkspaceTestingFolderSubfolderNameFor(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws error if empty', function() {
		assert.throws(function() {
			mod.OLSKDiskWorkspaceTestingFolderSubfolderNameFor('');
		}, /OLSKErrorInputNotValid/);
	});

	it('returns string', function() {
		assert.strictEqual(mod.OLSKDiskWorkspaceTestingFolderSubfolderNameFor('os-alfa'), 'test-os-alfa');
		assert.strictEqual(mod.OLSKDiskWorkspaceTestingFolderSubfolderNameFor('os-bravo.charlie'), 'test-os-bravo-charlie');
	});

});

describe('OLSKDiskSafeBasenameFor', function test_OLSKDiskSafeBasenameFor() {

	it('throws if not string', function() {
		assert.throws(function() {
			mod.OLSKDiskSafeBasenameFor(null);
		});
	});

	it('returns string', function() {
		assert.strictEqual(mod.OLSKDiskSafeBasenameFor('alfa'), 'alfa');
	});

	it('removes Dot', function() {
		assert.strictEqual(mod.OLSKDiskSafeBasenameFor('alfa.bravo'), 'alfa bravo');
	});

	it('removes Comma', function() {
		assert.strictEqual(mod.OLSKDiskSafeBasenameFor('alfa,bravo'), 'alfa bravo');
	});

	it('removes Semicolon', function() {
		assert.strictEqual(mod.OLSKDiskSafeBasenameFor('alfa;bravo'), 'alfa bravo');
	});

	it('removes Colon', function() {
		assert.strictEqual(mod.OLSKDiskSafeBasenameFor('alfa:bravo'), 'alfa bravo');
	});

	it('removes Star', function() {
		assert.strictEqual(mod.OLSKDiskSafeBasenameFor('alfa*bravo'), 'alfa bravo');
	});

	it('removes Question', function() {
		assert.strictEqual(mod.OLSKDiskSafeBasenameFor('alfa?bravo'), 'alfa bravo');
	});

	it('removes Pipeline', function() {
		assert.strictEqual(mod.OLSKDiskSafeBasenameFor('alfa|bravo'), 'alfa bravo');
	});

	it('removes Underscore', function() {
		assert.strictEqual(mod.OLSKDiskSafeBasenameFor('alfa_bravo'), 'alfa bravo');
	});

	it('removes GreaterLessThan', function() {
		assert.strictEqual(mod.OLSKDiskSafeBasenameFor('alfa<bravo>charlie'), 'alfa bravo charlie');
	});

	it('removes Slashes', function() {
		assert.strictEqual(mod.OLSKDiskSafeBasenameFor('alfa/bravo\\charlie'), 'alfa bravo charlie');
	});

	it('removes Quotes', function() {
		assert.strictEqual(mod.OLSKDiskSafeBasenameFor('"alfa" \'bravo\' “charlie” ‘delta’ «echo»'), 'alfa bravo charlie delta echo');
	});

	it('removes Whitespace', function() {
		assert.strictEqual(mod.OLSKDiskSafeBasenameFor('alfa\nbravo\tcharlie'), 'alfa bravo charlie');
	});

	it('removes DisallowedMultiple', function() {
		assert.strictEqual(mod.OLSKDiskSafeBasenameFor('alfa \n\t bravo'), 'alfa bravo');
	});

	it('removes DisallowedEnds', function() {
		assert.strictEqual(mod.OLSKDiskSafeBasenameFor(' \n\t alfa bravo \t\n '), 'alfa bravo');
	});

	it('removes Dashes', function() {
		assert.strictEqual(mod.OLSKDiskSafeBasenameFor('alfa-bravo–charlie—delta'), 'alfa-bravo–charlie—delta');
	});

	it('removes Brackets', function() {
		assert.strictEqual(mod.OLSKDiskSafeBasenameFor('(alfa) [bravo] {charlie}'), '(alfa) [bravo] {charlie}');
	});

	it('removes International', function() {
		assert.strictEqual(mod.OLSKDiskSafeBasenameFor('àlpha niño 縦書き 😀 € $'), 'àlpha niño 縦書き 😀 € $');
	});

});
