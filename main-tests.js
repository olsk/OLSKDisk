/*!
 * OLSKFilesystem
 * Copyright(c) 2018 Rosano Coutinho
 * MIT Licensed
 */

var assert = require('assert');

var pathPackage = require('path');
var fsPackage = require('fs');
var mkdirpPackage = require('mkdirp');

const mainModule = require('./main');

var testRootDirectory = pathPackage.join(
	mainModule.OLSKFilesystemWorkspaceTestingDirectoryName(),
	mainModule.OLSKFilesystemWorkspaceTestingDirectorySubfolderNameFor('os.filesystem'));

describe('OLSKFilesystemInputDataIsRealDirectoryPath', function testOLSKFilesystemInputDataIsRealDirectoryPath() {

	beforeEach(function() {
		if (fsPackage.existsSync(testRootDirectory)) {
			mainModule.OLSKFilesystemHelpDeleteDirectoryRecursive(testRootDirectory);
		}
	});

	it('returns null if parameter not filesystem path', function() {
		assert.strictEqual(mainModule.OLSKFilesystemInputDataIsRealDirectoryPath(''), false);
	});

	it('returns null if directory path does not exist', function() {
		assert.strictEqual(mainModule.OLSKFilesystemInputDataIsRealDirectoryPath(testRootDirectory), false);
	});

	it('returns null if path not directory', function() {
		var fileFullPath = pathPackage.join(
			testRootDirectory,
			'alpha.txt'
		);
		mkdirpPackage.sync(testRootDirectory);
		fsPackage.writeFileSync(fileFullPath, '');
		assert.strictEqual(mainModule.OLSKFilesystemInputDataIsRealDirectoryPath(fileFullPath), false);
	});

	it('returns true if directory exists', function() {
		mkdirpPackage.sync(testRootDirectory);
		assert.strictEqual(mainModule.OLSKFilesystemInputDataIsRealDirectoryPath(testRootDirectory), true);
	});

});

describe('OLSKFilesystemInputDataIsRealFilePath', function testOLSKFilesystemInputDataIsRealFilePath() {

	beforeEach(function() {
		if (fsPackage.existsSync(testRootDirectory)) {
			mainModule.OLSKFilesystemHelpDeleteDirectoryRecursive(testRootDirectory);
		}
	});

	var fileFullPath = pathPackage.join(
		testRootDirectory,
		'alpha.txt'
	);

	it('returns null if parameter not filesystem path', function() {
		assert.strictEqual(mainModule.OLSKFilesystemInputDataIsRealFilePath(''), false);
	});

	it('returns null if file path does not exist', function() {
		assert.strictEqual(mainModule.OLSKFilesystemInputDataIsRealFilePath(fileFullPath), false);
	});

	it('returns null if path not file', function() {
		mkdirpPackage.sync(testRootDirectory);
		assert.strictEqual(mainModule.OLSKFilesystemInputDataIsRealFilePath(testRootDirectory), false);
	});

	it('returns true if file exists', function() {
		mkdirpPackage.sync(testRootDirectory);
		fsPackage.writeFileSync(fileFullPath, '');
		assert.strictEqual(mainModule.OLSKFilesystemInputDataIsRealFilePath(fileFullPath), true);
	});

});

describe('OLSKFilesystemHelpCreateDirectoryIfDoesNotExist', function testOLSKFilesystemHelpCreateDirectoryIfDoesNotExist() {

	beforeEach(function() {
		if (fsPackage.existsSync(testRootDirectory)) {
			mainModule.OLSKFilesystemHelpDeleteDirectoryRecursive(testRootDirectory);
		}
	});

	it('returns null and creates directory', function() {
		var directoryFullPath = pathPackage.join(testRootDirectory, 'alpha');

		assert.strictEqual(fsPackage.existsSync(directoryFullPath), false);
		assert.strictEqual(mainModule.OLSKFilesystemHelpCreateDirectoryIfDoesNotExist(directoryFullPath), null);
		assert.strictEqual(fsPackage.existsSync(directoryFullPath), true);
	});

	it('does not delete existing directory', function() {
		var directoryFullPath = pathPackage.join(testRootDirectory, 'alpha');
		mkdirpPackage.sync(directoryFullPath);

		var fileFullPath = pathPackage.join(directoryFullPath, 'bravo.txt');
		fsPackage.writeFileSync(fileFullPath, '');
		assert.strictEqual(fsPackage.existsSync(fileFullPath), true);

		assert.strictEqual(mainModule.OLSKFilesystemHelpCreateDirectoryIfDoesNotExist(directoryFullPath), null);
		assert.strictEqual(fsPackage.existsSync(fileFullPath), true);
	});

});

describe('OLSKFilesystemHelpDeleteDirectoryRecursive', function testOLSKFilesystemHelpDeleteDirectoryRecursive() {

	beforeEach(function() {
		if (fsPackage.existsSync(testRootDirectory)) {
			mainModule.OLSKFilesystemHelpDeleteDirectoryRecursive(testRootDirectory);
		}
		mkdirpPackage.sync(testRootDirectory);
	});

	it('returns 0 if path does not exist', function() {
		var directoryFullPath = pathPackage.join(
			testRootDirectory,
			'alpha'
		);

		assert.strictEqual(fsPackage.existsSync(directoryFullPath), false);
		assert.strictEqual(mainModule.OLSKFilesystemHelpDeleteDirectoryRecursive(directoryFullPath), 0);
	});

	it('returns 0 if path not directory', function() {
		var fileFullPath = pathPackage.join(
			testRootDirectory,
			'alpha.txt'
		);
		mkdirpPackage.sync(testRootDirectory);
		fsPackage.writeFileSync(fileFullPath, '');

		assert.strictEqual(mainModule.OLSKFilesystemHelpDeleteDirectoryRecursive(fileFullPath), 0);
	});

	it('returns 1 and deletes directory', function() {
		var directoryFullPath = pathPackage.join(
			testRootDirectory,
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

		assert.strictEqual(mainModule.OLSKFilesystemHelpDeleteDirectoryRecursive(testRootDirectory), 1);
		assert.strictEqual(fsPackage.existsSync(directoryFullPath), false);
		assert.strictEqual(fsPackage.existsSync(testRootDirectory), false);
	});

});

describe('OLSKFilesystemAppDirectoryName', function testOLSKFilesystemAppDirectoryName() {

	it('returns constant', function() {
		assert.strictEqual(mainModule.OLSKFilesystemAppDirectoryName(), 'os-app');
	});

});

describe('OLSKFilesystemCacheDirectoryName', function testOLSKFilesystemCacheDirectoryName() {

	it('returns constant', function() {
		assert.strictEqual(mainModule.OLSKFilesystemCacheDirectoryName(), 'os-cache');
	});

});

describe('OLSKFilesystemDataDirectoryName', function testOLSKFilesystemDataDirectoryName() {

	it('returns constant', function() {
		assert.strictEqual(mainModule.OLSKFilesystemDataDirectoryName(), 'os-data');
	});

});

describe('OLSKFilesystemPublicDirectoryName', function testOLSKFilesystemPublicDirectoryName() {

	it('returns constant', function() {
		assert.strictEqual(mainModule.OLSKFilesystemPublicDirectoryName(), 'os-public');
	});

});

describe('OLSKFilesystemTestingDirectoryName', function testOLSKFilesystemTestingDirectoryName() {

	it('returns constant', function() {
		assert.strictEqual(mainModule.OLSKFilesystemTestingDirectoryName(), 'os-testing');
	});

});

describe('OLSKFilesystemWorkspaceTestingDirectoryName', function testOLSKFilesystemWorkspaceTestingDirectoryName() {

	it('returns constant', function() {
		assert.strictEqual(mainModule.OLSKFilesystemWorkspaceTestingDirectoryName(), 'os-workspace-testing');
	});

});

describe('OLSKFilesystemWorkspaceTestingDirectorySubfolderNameFor', function testOLSKFilesystemWorkspaceTestingDirectorySubfolderNameFor() {

	it('throws error if param1 not string', function() {
		assert.throws(function() {
			mainModule.OLSKFilesystemWorkspaceTestingDirectorySubfolderNameFor(null);
		}, /OLSKErrorInputInvalid/);
	});

	it('throws error if param1 empty', function() {
		assert.throws(function() {
			mainModule.OLSKFilesystemWorkspaceTestingDirectorySubfolderNameFor('');
		}, /OLSKErrorInputInvalid/);
	});

	it('returns subfolderName', function() {
		assert.strictEqual(mainModule.OLSKFilesystemWorkspaceTestingDirectorySubfolderNameFor('os-alpha'), 'test-os-alpha');
		assert.strictEqual(mainModule.OLSKFilesystemWorkspaceTestingDirectorySubfolderNameFor('os-bravo.charlie'), 'test-os-bravo-charlie');
	});

});

describe('OLSKFilesystemLaunchFileName', function testOLSKFilesystemLaunchFileName() {

	it('returns launch file name', function() {
		assert.strictEqual(mainModule.OLSKFilesystemLaunchFileName(), 'os-launch.js');
	});

});

describe('OLSKFilesystemDefaultTextEncoding', function testOLSKFilesystemDefaultTextEncoding() {

	it('returns system directory name', function() {
		assert.strictEqual(mainModule.OLSKFilesystemDefaultTextEncoding(), 'utf8');
	});

});

describe('OLSKFilesystemSafeBasenameFor', function testOLSKFilesystemSafeBasenameFor() {

	it('throws if not string', function() {
		assert.throws(function() {
			mainModule.OLSKFilesystemSafeBasenameFor(null);
		});
	});

	it('returns identical if no illegal characters', function() {
		assert.strictEqual(mainModule.OLSKFilesystemSafeBasenameFor('alpha'), 'alpha');
	});

	it('returns without dot', function() {
		assert.strictEqual(mainModule.OLSKFilesystemSafeBasenameFor('alpha.bravo'), 'alpha bravo');
	});

	it('returns without Comma', function() {
		assert.strictEqual(mainModule.OLSKFilesystemSafeBasenameFor('alpha,bravo'), 'alpha bravo');
	});

	it('returns without Semicolon', function() {
		assert.strictEqual(mainModule.OLSKFilesystemSafeBasenameFor('alpha;bravo'), 'alpha bravo');
	});

	it('returns without Colon', function() {
		assert.strictEqual(mainModule.OLSKFilesystemSafeBasenameFor('alpha:bravo'), 'alpha bravo');
	});

	it('returns without Star', function() {
		assert.strictEqual(mainModule.OLSKFilesystemSafeBasenameFor('alpha*bravo'), 'alpha bravo');
	});

	it('returns without Question', function() {
		assert.strictEqual(mainModule.OLSKFilesystemSafeBasenameFor('alpha?bravo'), 'alpha bravo');
	});

	it('returns without Pipeline', function() {
		assert.strictEqual(mainModule.OLSKFilesystemSafeBasenameFor('alpha|bravo'), 'alpha bravo');
	});

	it('returns without Underscore', function() {
		assert.strictEqual(mainModule.OLSKFilesystemSafeBasenameFor('alpha_bravo'), 'alpha bravo');
	});

	it('returns without GreaterLessThan', function() {
		assert.strictEqual(mainModule.OLSKFilesystemSafeBasenameFor('alpha<bravo>charlie'), 'alpha bravo charlie');
	});

	it('returns without Slashes', function() {
		assert.strictEqual(mainModule.OLSKFilesystemSafeBasenameFor('alpha/bravo\\charlie'), 'alpha bravo charlie');
	});

	it('returns without Quotes', function() {
		assert.strictEqual(mainModule.OLSKFilesystemSafeBasenameFor('"alpha" \'bravo\' “charlie” ‘delta’ «echo»'), 'alpha bravo charlie delta echo');
	});

	it('returns without Whitespace', function() {
		assert.strictEqual(mainModule.OLSKFilesystemSafeBasenameFor('alpha\nbravo\tcharlie'), 'alpha bravo charlie');
	});

	it('returns without DisallowedMultiple', function() {
		assert.strictEqual(mainModule.OLSKFilesystemSafeBasenameFor('alpha \n\t bravo'), 'alpha bravo');
	});

	it('returns without DisallowedEnds', function() {
		assert.strictEqual(mainModule.OLSKFilesystemSafeBasenameFor(' \n\t alpha bravo \t\n '), 'alpha bravo');
	});

	it('returns without Dashes', function() {
		assert.strictEqual(mainModule.OLSKFilesystemSafeBasenameFor('alpha-bravo–charlie—delta'), 'alpha-bravo–charlie—delta');
	});

	it('returns without Brackets', function() {
		assert.strictEqual(mainModule.OLSKFilesystemSafeBasenameFor('(alpha) [bravo] {charlie}'), '(alpha) [bravo] {charlie}');
	});

	it('returns without International', function() {
		assert.strictEqual(mainModule.OLSKFilesystemSafeBasenameFor('àlpha niño 縦書き 😀 € $'), 'àlpha niño 縦書き 😀 € $');
	});

});
