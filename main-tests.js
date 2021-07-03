const { throws, deepEqual } = require('assert');

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
		deepEqual(mod.OLSKDiskIsRealFolderPath(kTesting.StubRoot('alfa')), false);
	});

	it('returns false if not folder', function() {
		deepEqual(mod.OLSKDiskIsRealFolderPath(mod.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), '')), false);
	});

	it('returns true', function() {
		deepEqual(mod.OLSKDiskIsRealFolderPath(mod.OLSKDiskCreateFolder(kTesting.StubRoot())), true);
	});

});

describe('OLSKDiskIsRealFilePath', function test_OLSKDiskIsRealFilePath() {

	beforeEach(function() {
		mod.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('returns false if not real', function() {
		deepEqual(mod.OLSKDiskIsRealFilePath(kTesting.StubRoot('alfa.txt')), false);
	});

	it('returns false if not file', function() {
		deepEqual(mod.OLSKDiskIsRealFilePath(mod.OLSKDiskCreateFolder(kTesting.StubRoot('alfa'))), false);
	});

	it('returns true', function() {
		deepEqual(mod.OLSKDiskIsRealFilePath(mod.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), '')), true);
	});

});

describe('OLSKDiskCreateFolder', function test_OLSKDiskCreateFolder() {

	beforeEach(function() {
		mod.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('throws if not string', function() {
		throws(function () {
			mod.OLSKDiskCreateFolder(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if real file', function() {
		throws(function () {
			mod.OLSKDiskCreateFolder(mod.OLSKDiskWriteFile(kTesting.StubRoot('alfa'), ''));
		}, /OLSKErrorInputNotValid/);
	});

	it('returns inputData', function() {
		deepEqual(mod.OLSKDiskCreateFolder(kTesting.StubRoot('alfa')), kTesting.StubRoot('alfa'));
	});

	it('creates folder', function() {
		deepEqual(mod.OLSKDiskIsRealFolderPath(kTesting.StubRoot('alfa/bravo')), false);
		deepEqual(mod.OLSKDiskIsRealFolderPath(mod.OLSKDiskCreateFolder(kTesting.StubRoot('alfa/bravo'))), true);
	});

});

describe('OLSKDiskDeleteFolder', function test_OLSKDiskDeleteFolder() {

	beforeEach(function() {
		mod.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('throws if not string', function() {
		throws(function () {
			mod.OLSKDiskDeleteFolder(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns inputData', function() {
		deepEqual(mod.OLSKDiskDeleteFolder(mod.OLSKDiskCreateFolder(kTesting.StubRoot('alfa'))), kTesting.StubRoot('alfa'));
	});

	it('deletes folder', function() {
		deepEqual(mod.OLSKDiskIsRealFolderPath(mod.OLSKDiskDeleteFolder(mod.OLSKDiskCreateFolder(kTesting.StubRoot('alfa')))), false);
	});

});

describe('OLSKDiskWriteFile', function test_OLSKDiskWriteFile() {

	beforeEach(function() {
		mod.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('throws if param1 not string', function() {
		throws(function () {
			mod.OLSKDiskWriteFile(null, '');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not string', function() {
		throws(function () {
			mod.OLSKDiskWriteFile('', null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns param1', function() {
		deepEqual(mod.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), ''), kTesting.StubRoot('alfa.txt'));
	});

	it('creates parent folders if not real', function() {
		deepEqual(mod.OLSKDiskIsRealFolderPath(kTesting.StubRoot('alfa'), ''), false);
		deepEqual(mod.OLSKDiskIsRealFolderPath(pathPackage.dirname(mod.OLSKDiskWriteFile(kTesting.StubRoot('alfa/bravo.txt'), ''))), true);
	});

	it('creates file if not real', function() {
		deepEqual(mod.OLSKDiskIsRealFilePath(kTesting.StubRoot('alfa.txt'), ''), false);
		deepEqual(mod.OLSKDiskIsRealFilePath(mod.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), '')), true);
	});

	it('updates content', function() {
		deepEqual(mod.OLSKDiskReadFile(mod.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), 'bravo')), 'bravo');
		deepEqual(mod.OLSKDiskReadFile(mod.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), 'charlie')), 'charlie');
	});

});

describe('OLSKDiskReadFile', function test_OLSKDiskReadFile() {

	beforeEach(function() {
		mod.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('throws if not string', function() {
		throws(function () {
			mod.OLSKDiskReadFile(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if not real path', function() {
		throws(function () {
			mod.OLSKDiskReadFile('alfa.txt');
		}, /OLSKErrorInputNotValid/);
	});

	it('returns content', function() {
		deepEqual(mod.OLSKDiskReadFile(mod.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), 'bravo')), 'bravo');
	});

});

describe('OLSKDiskWrite', function test_OLSKDiskWrite() {

	beforeEach(function() {
		mod.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('throws if param1 not string', function() {
		throws(function () {
			mod.OLSKDiskWrite(null, Math.random().toString());
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not string', function() {
		throws(function () {
			mod.OLSKDiskWrite(Math.random().toString(), null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns param2', function() {
		const item = Math.random().toString();
		deepEqual(mod.OLSKDiskWrite(kTesting.StubRoot(Math.random().toString()), item), item);
	});

	it('creates parent folders if not real', function() {
		const folder = Math.random().toString();
		const path = kTesting.StubRoot(folder + '/' + Math.random().toString());

		deepEqual(mod.OLSKDiskIsRealFolderPath(kTesting.StubRoot(folder)), false);

		mod.OLSKDiskWrite(path, Math.random().toString());
		deepEqual(mod.OLSKDiskIsRealFolderPath(pathPackage.dirname(path)), true);
	});

	it('creates file if not real', function() {
		const item = kTesting.StubRoot(Math.random().toString());
		deepEqual(mod.OLSKDiskIsRealFilePath(item), false);

		mod.OLSKDiskWrite(item, Math.random().toString());
		deepEqual(mod.OLSKDiskIsRealFilePath(item), true);
	});

	it('updates content', function() {
		const item = kTesting.StubRoot(Math.random().toString());

		mod.OLSKDiskWrite(item, 'bravo');
		deepEqual(mod.OLSKDiskReadFile(item), 'bravo');

		mod.OLSKDiskWrite(item, 'charlie');
		deepEqual(mod.OLSKDiskReadFile(item), 'charlie');
	});

});

describe('OLSKDiskRead', function test_OLSKDiskRead() {

	beforeEach(function() {
		mod.OLSKDiskDeleteFolder(kTesting.StubRoot());
	});

	it('throws if not string', function() {
		throws(function () {
			mod.OLSKDiskRead(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns null if not real path', function() {
		deepEqual(mod.OLSKDiskRead(Math.random().toString()), null);
	});

	it('returns content', function() {
		deepEqual(mod.OLSKDiskRead(mod.OLSKDiskWriteFile(kTesting.StubRoot('alfa.txt'), 'bravo')), 'bravo');
	});

});

describe('OLSKDiskAppFolderName', function test_OLSKDiskAppFolderName() {

	it('returns constant', function() {
		deepEqual(mod.OLSKDiskAppFolderName(), 'os-app');
	});

});

describe('OLSKDiskWorkspaceTestingFolderSubfolderNameFor', function test_OLSKDiskWorkspaceTestingFolderSubfolderNameFor() {

	it('throws error if not string', function() {
		throws(function() {
			mod.OLSKDiskWorkspaceTestingFolderSubfolderNameFor(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws error if empty', function() {
		throws(function() {
			mod.OLSKDiskWorkspaceTestingFolderSubfolderNameFor('');
		}, /OLSKErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mod.OLSKDiskWorkspaceTestingFolderSubfolderNameFor('os-alfa'), 'test-os-alfa');
		deepEqual(mod.OLSKDiskWorkspaceTestingFolderSubfolderNameFor('os-bravo.charlie'), 'test-os-bravo-charlie');
	});

});

describe('OLSKDiskSafeBasenameFor', function test_OLSKDiskSafeBasenameFor() {

	it('throws if not string', function() {
		throws(function() {
			mod.OLSKDiskSafeBasenameFor(null);
		});
	});

	it('returns string', function() {
		deepEqual(mod.OLSKDiskSafeBasenameFor('alfa'), 'alfa');
	});

	it('removes Dot', function() {
		deepEqual(mod.OLSKDiskSafeBasenameFor('alfa.bravo'), 'alfa bravo');
	});

	it('removes Comma', function() {
		deepEqual(mod.OLSKDiskSafeBasenameFor('alfa,bravo'), 'alfa bravo');
	});

	it('removes Semicolon', function() {
		deepEqual(mod.OLSKDiskSafeBasenameFor('alfa;bravo'), 'alfa bravo');
	});

	it('removes Colon', function() {
		deepEqual(mod.OLSKDiskSafeBasenameFor('alfa:bravo'), 'alfa bravo');
	});

	it('removes Star', function() {
		deepEqual(mod.OLSKDiskSafeBasenameFor('alfa*bravo'), 'alfa bravo');
	});

	it('removes Question', function() {
		deepEqual(mod.OLSKDiskSafeBasenameFor('alfa?bravo'), 'alfa bravo');
	});

	it('removes Pipeline', function() {
		deepEqual(mod.OLSKDiskSafeBasenameFor('alfa|bravo'), 'alfa bravo');
	});

	it('removes Underscore', function() {
		deepEqual(mod.OLSKDiskSafeBasenameFor('alfa_bravo'), 'alfa bravo');
	});

	it('removes GreaterLessThan', function() {
		deepEqual(mod.OLSKDiskSafeBasenameFor('alfa<bravo>charlie'), 'alfa bravo charlie');
	});

	it('removes Slashes', function() {
		deepEqual(mod.OLSKDiskSafeBasenameFor('alfa/bravo\\charlie'), 'alfa bravo charlie');
	});

	it('removes Quotes', function() {
		deepEqual(mod.OLSKDiskSafeBasenameFor('"alfa" \'bravo\' “charlie” ‘delta’ «echo»'), 'alfa bravo charlie delta echo');
	});

	it('removes Whitespace', function() {
		deepEqual(mod.OLSKDiskSafeBasenameFor('alfa\nbravo\tcharlie'), 'alfa bravo charlie');
	});

	it('removes DisallowedMultiple', function() {
		deepEqual(mod.OLSKDiskSafeBasenameFor('alfa \n\t bravo'), 'alfa bravo');
	});

	it('removes DisallowedEnds', function() {
		deepEqual(mod.OLSKDiskSafeBasenameFor(' \n\t alfa bravo \t\n '), 'alfa bravo');
	});

	it('removes Dashes', function() {
		deepEqual(mod.OLSKDiskSafeBasenameFor('alfa-bravo–charlie—delta'), 'alfa-bravo–charlie—delta');
	});

	it('removes Brackets', function() {
		deepEqual(mod.OLSKDiskSafeBasenameFor('(alfa) [bravo] {charlie}'), '(alfa) [bravo] {charlie}');
	});

	it('removes International', function() {
		deepEqual(mod.OLSKDiskSafeBasenameFor('àlpha niño 縦書き 😀 € $'), 'àlpha niño 縦書き 😀 € $');
	});

});

describe('OLSKDiskOpen', function test_OLSKDiskOpen() {

	const _OLSKDiskOpen = function (inputData, params = {}) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilOpen: (function () {}),
		}, params).OLSKDiskOpen(inputData);
	};

	it('throws if not string', function() {
		throws(function () {
			_OLSKDiskOpen(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns inputData', function() {
		const item = Math.random().toString();
		deepEqual(_OLSKDiskOpen(item), item);
	});

	it('calls _DataFoilOpen', function() {
		const item = Math.random().toString();
		deepEqual(uCapture(function (_DataFoilOpen) {
			_OLSKDiskOpen(item, {
				_DataFoilOpen,
			})
		}), [item]);
	});

});
