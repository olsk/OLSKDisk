/*!
 * OLSKDisk
 * Copyright(c) 2018 Rosano Coutinho
 * MIT Licensed
 */

const assert = require('assert');

const pathPackage = require('path');
const fsPackage = require('fs');
const mkdirpPackage = require('mkdirp');

const mainModule = require('./main');

const kTesting = {
	StubRootDirectory: function () {
		return pathPackage.join(
	mainModule.OLSKDiskWorkspaceTestingDirectoryName(),
	mainModule.OLSKDiskWorkspaceTestingDirectorySubfolderNameFor('os.filesystem'));
	},
	StubRoot: function (inputData) {
		return pathPackage.join(kTesting.StubRootDirectory(), inputData || '');
	},
};

describe('OLSKDiskInputDataIsRealDirectoryPath', function testOLSKDiskInputDataIsRealDirectoryPath() {

	beforeEach(function() {
		if (fsPackage.existsSync(kTesting.StubRootDirectory())) {
			mainModule.OLSKDiskHelpDeleteDirectoryRecursive(kTesting.StubRootDirectory());
		}
	});

	it('returns false if not path', function() {
		assert.strictEqual(mainModule.OLSKDiskInputDataIsRealDirectoryPath(''), false);
	});

	it('returns false if does not exist', function() {
		assert.strictEqual(mainModule.OLSKDiskInputDataIsRealDirectoryPath(kTesting.StubRootDirectory()), false);
	});

	it('returns false if not directory', function() {
		var fileFullPath = pathPackage.join(
			kTesting.StubRootDirectory(),
			'alpha.txt'
		);
		mkdirpPackage.sync(kTesting.StubRootDirectory());
		fsPackage.writeFileSync(fileFullPath, '');
		assert.strictEqual(mainModule.OLSKDiskInputDataIsRealDirectoryPath(fileFullPath), false);
	});

	it('returns true if directory exists', function() {
		mkdirpPackage.sync(kTesting.StubRootDirectory());
		assert.strictEqual(mainModule.OLSKDiskInputDataIsRealDirectoryPath(kTesting.StubRootDirectory()), true);
	});

});

describe('OLSKDiskInputDataIsRealFilePath', function testOLSKDiskInputDataIsRealFilePath() {

	beforeEach(function() {
		if (fsPackage.existsSync(kTesting.StubRootDirectory())) {
			mainModule.OLSKDiskHelpDeleteDirectoryRecursive(kTesting.StubRootDirectory());
		}
	});

	var fileFullPath = pathPackage.join(
		kTesting.StubRootDirectory(),
		'alpha.txt'
	);

	it('returns null if parameter not filesystem path', function() {
		assert.strictEqual(mainModule.OLSKDiskInputDataIsRealFilePath(''), false);
	});

	it('returns null if file path does not exist', function() {
		assert.strictEqual(mainModule.OLSKDiskInputDataIsRealFilePath(fileFullPath), false);
	});

	it('returns null if path not file', function() {
		mkdirpPackage.sync(kTesting.StubRootDirectory());
		assert.strictEqual(mainModule.OLSKDiskInputDataIsRealFilePath(kTesting.StubRootDirectory()), false);
	});

	it('returns true if file exists', function() {
		mkdirpPackage.sync(kTesting.StubRootDirectory());
		fsPackage.writeFileSync(fileFullPath, '');
		assert.strictEqual(mainModule.OLSKDiskInputDataIsRealFilePath(fileFullPath), true);
	});

});

describe('OLSKDiskCreateFolder', function testOLSKDiskCreateFolder() {

	beforeEach(function() {
		if (fsPackage.existsSync(kTesting.StubRootDirectory())) {
			mainModule.OLSKDiskHelpDeleteDirectoryRecursive(kTesting.StubRootDirectory());
		}
	});

	it('returns inputData', function() {
		assert.strictEqual(mainModule.OLSKDiskCreateFolder(kTesting.StubRoot('alfa')), kTesting.StubRoot('alfa'));
	});

	it('creates directory', function() {
		assert.strictEqual(fsPackage.existsSync(kTesting.StubRoot('alfa')), false);
		assert.strictEqual(fsPackage.existsSync(mainModule.OLSKDiskCreateFolder(kTesting.StubRoot('alfa'))), true);
	});

	it('does not delete existing directory', function() {
		var directoryFullPath = pathPackage.join(kTesting.StubRootDirectory(), 'alpha');
		mkdirpPackage.sync(directoryFullPath);

		var fileFullPath = pathPackage.join(directoryFullPath, 'bravo.txt');
		fsPackage.writeFileSync(fileFullPath, '');
		assert.strictEqual(fsPackage.existsSync(fileFullPath), true);

		assert.strictEqual(fsPackage.existsSync(mainModule.OLSKDiskCreateFolder(directoryFullPath)), true);
	});

});

describe('OLSKDiskHelpDeleteDirectoryRecursive', function testOLSKDiskHelpDeleteDirectoryRecursive() {

	beforeEach(function() {
		if (fsPackage.existsSync(kTesting.StubRootDirectory())) {
			mainModule.OLSKDiskHelpDeleteDirectoryRecursive(kTesting.StubRootDirectory());
		}
		mkdirpPackage.sync(kTesting.StubRootDirectory());
	});

	it('returns 0 if path does not exist', function() {
		var directoryFullPath = pathPackage.join(
			kTesting.StubRootDirectory(),
			'alpha'
		);

		assert.strictEqual(fsPackage.existsSync(directoryFullPath), false);
		assert.strictEqual(mainModule.OLSKDiskHelpDeleteDirectoryRecursive(directoryFullPath), 0);
	});

	it('returns 0 if path not directory', function() {
		var fileFullPath = pathPackage.join(
			kTesting.StubRootDirectory(),
			'alpha.txt'
		);
		mkdirpPackage.sync(kTesting.StubRootDirectory());
		fsPackage.writeFileSync(fileFullPath, '');

		assert.strictEqual(mainModule.OLSKDiskHelpDeleteDirectoryRecursive(fileFullPath), 0);
	});

	it('returns 1 and deletes directory', function() {
		var directoryFullPath = pathPackage.join(
			kTesting.StubRootDirectory(),
			'alpha'
		);
		assert.strictEqual(fsPackage.existsSync(directoryFullPath), false);

		var fileFullPath = pathPackage.join(
			directoryFullPath,
			'alpha.txt'
		);
		mkdirpPackage.sync(directoryFullPath);
		fsPackage.writeFileSync(fileFullPath, '');
		assert.strictEqual(fsPackage.existsSync(fileFullPath), true);

		assert.strictEqual(mainModule.OLSKDiskHelpDeleteDirectoryRecursive(kTesting.StubRootDirectory()), 1);
		assert.strictEqual(fsPackage.existsSync(directoryFullPath), false);
		assert.strictEqual(fsPackage.existsSync(kTesting.StubRootDirectory()), false);
	});

});

describe('OLSKDiskAppDirectoryName', function testOLSKDiskAppDirectoryName() {

	it('returns constant', function() {
		assert.strictEqual(mainModule.OLSKDiskAppDirectoryName(), 'os-app');
	});

});

describe('OLSKDiskCacheDirectoryName', function testOLSKDiskCacheDirectoryName() {

	it('returns constant', function() {
		assert.strictEqual(mainModule.OLSKDiskCacheDirectoryName(), 'os-cache');
	});

});

describe('OLSKDiskDataDirectoryName', function testOLSKDiskDataDirectoryName() {

	it('returns constant', function() {
		assert.strictEqual(mainModule.OLSKDiskDataDirectoryName(), 'os-data');
	});

});

describe('OLSKDiskPublicDirectoryName', function testOLSKDiskPublicDirectoryName() {

	it('returns constant', function() {
		assert.strictEqual(mainModule.OLSKDiskPublicDirectoryName(), 'os-public');
	});

});

describe('OLSKDiskWorkspaceTestingDirectoryName', function testOLSKDiskWorkspaceTestingDirectoryName() {

	it('returns constant', function() {
		assert.strictEqual(mainModule.OLSKDiskWorkspaceTestingDirectoryName(), 'os-workspace-testing');
	});

});

describe('OLSKDiskWorkspaceTestingDirectorySubfolderNameFor', function testOLSKDiskWorkspaceTestingDirectorySubfolderNameFor() {

	it('throws error if param1 not string', function() {
		assert.throws(function() {
			mainModule.OLSKDiskWorkspaceTestingDirectorySubfolderNameFor(null);
		}, /OLSKErrorInputInvalid/);
	});

	it('throws error if param1 empty', function() {
		assert.throws(function() {
			mainModule.OLSKDiskWorkspaceTestingDirectorySubfolderNameFor('');
		}, /OLSKErrorInputInvalid/);
	});

	it('returns subfolderName', function() {
		assert.strictEqual(mainModule.OLSKDiskWorkspaceTestingDirectorySubfolderNameFor('os-alpha'), 'test-os-alpha');
		assert.strictEqual(mainModule.OLSKDiskWorkspaceTestingDirectorySubfolderNameFor('os-bravo.charlie'), 'test-os-bravo-charlie');
	});

});

describe('OLSKDiskLaunchFileName', function testOLSKDiskLaunchFileName() {

	it('returns launch file name', function() {
		assert.strictEqual(mainModule.OLSKDiskLaunchFileName(), 'os-launch.js');
	});

});

describe('OLSKDiskDefaultTextEncoding', function testOLSKDiskDefaultTextEncoding() {

	it('returns system directory name', function() {
		assert.strictEqual(mainModule.OLSKDiskDefaultTextEncoding(), 'utf8');
	});

});

describe('OLSKDiskSafeBasenameFor', function testOLSKDiskSafeBasenameFor() {

	it('throws if not string', function() {
		assert.throws(function() {
			mainModule.OLSKDiskSafeBasenameFor(null);
		});
	});

	it('returns identical if no illegal characters', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alpha'), 'alpha');
	});

	it('returns without dot', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alpha.bravo'), 'alpha bravo');
	});

	it('returns without Comma', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alpha,bravo'), 'alpha bravo');
	});

	it('returns without Semicolon', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alpha;bravo'), 'alpha bravo');
	});

	it('returns without Colon', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alpha:bravo'), 'alpha bravo');
	});

	it('returns without Star', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alpha*bravo'), 'alpha bravo');
	});

	it('returns without Question', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alpha?bravo'), 'alpha bravo');
	});

	it('returns without Pipeline', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alpha|bravo'), 'alpha bravo');
	});

	it('returns without Underscore', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alpha_bravo'), 'alpha bravo');
	});

	it('returns without GreaterLessThan', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alpha<bravo>charlie'), 'alpha bravo charlie');
	});

	it('returns without Slashes', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alpha/bravo\\charlie'), 'alpha bravo charlie');
	});

	it('returns without Quotes', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('"alpha" \'bravo\' “charlie” ‘delta’ «echo»'), 'alpha bravo charlie delta echo');
	});

	it('returns without Whitespace', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alpha\nbravo\tcharlie'), 'alpha bravo charlie');
	});

	it('returns without DisallowedMultiple', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alpha \n\t bravo'), 'alpha bravo');
	});

	it('returns without DisallowedEnds', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor(' \n\t alpha bravo \t\n '), 'alpha bravo');
	});

	it('returns without Dashes', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('alpha-bravo–charlie—delta'), 'alpha-bravo–charlie—delta');
	});

	it('returns without Brackets', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('(alpha) [bravo] {charlie}'), '(alpha) [bravo] {charlie}');
	});

	it('returns without International', function() {
		assert.strictEqual(mainModule.OLSKDiskSafeBasenameFor('àlpha niño 縦書き 😀 € $'), 'àlpha niño 縦書き 😀 € $');
	});

});
