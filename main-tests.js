/*!
 * OldSkool
 * Copyright(c) 2018 Rosano Coutinho
 * MIT Licensed
 */

var assert = require('assert');

var pathPackage = require('path');
var fsPackage = require('fs');
var mkdirpPackage = require('mkdirp');

var filesystemLibrary = require('./main');

var testRootDirectory = pathPackage.join(
	filesystemLibrary.OLSKFilesystemWorkspaceTestingDirectoryName(),
	filesystemLibrary.OLSKFilesystemWorkspaceTestingDirectorySubfolderNameFor('os.filesystem'));

describe('OLSKFilesystemInputDataIsRealDirectoryPath', function testOLSKFilesystemInputDataIsRealDirectoryPath() {

	beforeEach(function() {
		if (fsPackage.existsSync(testRootDirectory)) {
			filesystemLibrary.OLSKFilesystemHelpDeleteDirectoryRecursive(testRootDirectory);
		}
	});

	it('returns null if parameter not filesystem path', function() {
		assert.strictEqual(filesystemLibrary.OLSKFilesystemInputDataIsRealDirectoryPath(''), false);
	});

	it('returns null if directory path does not exist', function() {
		assert.strictEqual(filesystemLibrary.OLSKFilesystemInputDataIsRealDirectoryPath(testRootDirectory), false);
	});

	it('returns null if path not directory', function() {
		var fileFullPath = pathPackage.join(
			testRootDirectory,
			'alpha.txt'
		);
		mkdirpPackage.sync(testRootDirectory);
		fsPackage.writeFileSync(fileFullPath, '');
		assert.strictEqual(filesystemLibrary.OLSKFilesystemInputDataIsRealDirectoryPath(fileFullPath), false);
	});

	it('returns true if directory exists', function() {
		mkdirpPackage.sync(testRootDirectory);
		assert.strictEqual(filesystemLibrary.OLSKFilesystemInputDataIsRealDirectoryPath(testRootDirectory), true);
	});

});

describe('OLSKFilesystemInputDataIsRealFilePath', function testOLSKFilesystemInputDataIsRealFilePath() {

	beforeEach(function() {
		if (fsPackage.existsSync(testRootDirectory)) {
			filesystemLibrary.OLSKFilesystemHelpDeleteDirectoryRecursive(testRootDirectory);
		}
	});

	var fileFullPath = pathPackage.join(
		testRootDirectory,
		'alpha.txt'
	);

	it('returns null if parameter not filesystem path', function() {
		assert.strictEqual(filesystemLibrary.OLSKFilesystemInputDataIsRealFilePath(''), false);
	});

	it('returns null if file path does not exist', function() {
		assert.strictEqual(filesystemLibrary.OLSKFilesystemInputDataIsRealFilePath(fileFullPath), false);
	});

	it('returns null if path not file', function() {
		mkdirpPackage.sync(testRootDirectory);
		assert.strictEqual(filesystemLibrary.OLSKFilesystemInputDataIsRealFilePath(testRootDirectory), false);
	});

	it('returns true if file exists', function() {
		mkdirpPackage.sync(testRootDirectory);
		fsPackage.writeFileSync(fileFullPath, '');
		assert.strictEqual(filesystemLibrary.OLSKFilesystemInputDataIsRealFilePath(fileFullPath), true);
	});

});

describe('OLSKFilesystemHelpCreateDirectoryIfDoesNotExist', function testOLSKFilesystemHelpCreateDirectoryIfDoesNotExist() {

	beforeEach(function() {
		if (fsPackage.existsSync(testRootDirectory)) {
			filesystemLibrary.OLSKFilesystemHelpDeleteDirectoryRecursive(testRootDirectory);
		}
	});

	it('returns null and creates directory', function() {
		var directoryFullPath = pathPackage.join(testRootDirectory, 'alpha');

		assert.strictEqual(fsPackage.existsSync(directoryFullPath), false);
		assert.strictEqual(filesystemLibrary.OLSKFilesystemHelpCreateDirectoryIfDoesNotExist(directoryFullPath), null);
		assert.strictEqual(fsPackage.existsSync(directoryFullPath), true);
	});

	it('does not delete existing directory', function() {
		var directoryFullPath = pathPackage.join(testRootDirectory, 'alpha');
		mkdirpPackage.sync(directoryFullPath);

		var fileFullPath = pathPackage.join(directoryFullPath, 'bravo.txt');
		fsPackage.writeFileSync(fileFullPath, '');
		assert.strictEqual(fsPackage.existsSync(fileFullPath), true);

		assert.strictEqual(filesystemLibrary.OLSKFilesystemHelpCreateDirectoryIfDoesNotExist(directoryFullPath), null);
		assert.strictEqual(fsPackage.existsSync(fileFullPath), true);
	});

});

describe('OLSKFilesystemHelpDeleteDirectoryRecursive', function testOLSKFilesystemHelpDeleteDirectoryRecursive() {

	beforeEach(function() {
		if (fsPackage.existsSync(testRootDirectory)) {
			filesystemLibrary.OLSKFilesystemHelpDeleteDirectoryRecursive(testRootDirectory);
		}
		mkdirpPackage.sync(testRootDirectory);
	});

	it('returns 0 if path does not exist', function() {
		var directoryFullPath = pathPackage.join(
			testRootDirectory,
			'alpha'
		);

		assert.strictEqual(fsPackage.existsSync(directoryFullPath), false);
		assert.strictEqual(filesystemLibrary.OLSKFilesystemHelpDeleteDirectoryRecursive(directoryFullPath), 0);
	});

	it('returns 0 if path not directory', function() {
		var fileFullPath = pathPackage.join(
			testRootDirectory,
			'alpha.txt'
		);
		mkdirpPackage.sync(testRootDirectory);
		fsPackage.writeFileSync(fileFullPath, '');

		assert.strictEqual(filesystemLibrary.OLSKFilesystemHelpDeleteDirectoryRecursive(fileFullPath), 0);
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

		assert.strictEqual(filesystemLibrary.OLSKFilesystemHelpDeleteDirectoryRecursive(testRootDirectory), 1);
		assert.strictEqual(fsPackage.existsSync(directoryFullPath), false);
		assert.strictEqual(fsPackage.existsSync(testRootDirectory), false);
	});

});

describe('OLSKFilesystemAppDirectoryName', function testOLSKFilesystemAppDirectoryName() {

	it('returns app directory name', function() {
		assert.strictEqual(filesystemLibrary.OLSKFilesystemAppDirectoryName(), 'os-app');
	});

});

describe('OLSKFilesystemCacheDirectoryName', function testOLSKFilesystemCacheDirectoryName() {

	it('returns cache directory name', function() {
		assert.strictEqual(filesystemLibrary.OLSKFilesystemCacheDirectoryName(), 'os-cache');
	});

});

describe('OLSKFilesystemDataDirectoryName', function testOLSKFilesystemDataDirectoryName() {

	it('returns data directory name', function() {
		assert.strictEqual(filesystemLibrary.OLSKFilesystemDataDirectoryName(), 'os-data');
	});

});

describe('OLSKFilesystemPublicDirectoryName', function testOLSKFilesystemPublicDirectoryName() {

	it('returns public directory name', function() {
		assert.strictEqual(filesystemLibrary.OLSKFilesystemPublicDirectoryName(), 'os-public');
	});

});

describe('OLSKFilesystemSystemDirectoryName', function testOLSKFilesystemSystemDirectoryName() {

	it('returns system directory name', function() {
		assert.strictEqual(filesystemLibrary.OLSKFilesystemSystemDirectoryName(), 'os-system');
	});

});

describe('OLSKFilesystemWorkspaceTestingDirectoryName', function testOLSKFilesystemWorkspaceTestingDirectoryName() {

	it('returns workspace testing directory name', function() {
		assert.strictEqual(filesystemLibrary.OLSKFilesystemWorkspaceTestingDirectoryName(), 'os-workspace-testing');
	});

});

describe('OLSKFilesystemWorkspaceTestingDirectorySubfolderNameFor', function testOLSKFilesystemWorkspaceTestingDirectorySubfolderNameFor() {

	it('throws error if param1 not string', function() {
		assert.throws(function() {
			filesystemLibrary.OLSKFilesystemWorkspaceTestingDirectorySubfolderNameFor(null);
		}, /OLSKErrorInputInvalid/);
	});

	it('throws error if param1 empty', function() {
		assert.throws(function() {
			filesystemLibrary.OLSKFilesystemWorkspaceTestingDirectorySubfolderNameFor('');
		}, /OLSKErrorInputInvalid/);
	});

	it('returns subfolderName', function() {
		assert.strictEqual(filesystemLibrary.OLSKFilesystemWorkspaceTestingDirectorySubfolderNameFor('os-alpha'), 'test-os-alpha');
		assert.strictEqual(filesystemLibrary.OLSKFilesystemWorkspaceTestingDirectorySubfolderNameFor('os-bravo.charlie'), 'test-os-bravo-charlie');
	});

});

describe('OLSKFilesystemLaunchFileName', function testOLSKFilesystemLaunchFileName() {

	it('returns launch file name', function() {
		assert.strictEqual(filesystemLibrary.OLSKFilesystemLaunchFileName(), 'os-launch.js');
	});

});

describe('OLSKFilesystemDefaultTextEncoding', function testOLSKFilesystemDefaultTextEncoding() {

	it('returns system directory name', function() {
		assert.strictEqual(filesystemLibrary.OLSKFilesystemDefaultTextEncoding(), 'utf8');
	});

});

describe('OLSKFilesystemSafeBasenameFor', function testOLSKFilesystemSafeBasenameFor() {

	it('throws if not string', function() {
		assert.throws(function() {
			filesystemLibrary.OLSKFilesystemSafeBasenameFor(null);
		});
	});

	it('returns identical if no illegal characters', function() {
		assert.strictEqual(filesystemLibrary.OLSKFilesystemSafeBasenameFor('alpha'), 'alpha');
	});

	it('returns without dot', function() {
		assert.strictEqual(filesystemLibrary.OLSKFilesystemSafeBasenameFor('alpha.bravo'), 'alpha bravo');
	});
    
  it('returns without Comma', function() {
  	assert.strictEqual(filesystemLibrary.OLSKFilesystemSafeBasenameFor("alpha,bravo"), "alpha bravo");
  });
  
  it('returns without Semicolon', function() {
  	assert.strictEqual(filesystemLibrary.OLSKFilesystemSafeBasenameFor("alpha;bravo"), "alpha bravo");
  });
  
  it('returns without Colon', function() {
  	assert.strictEqual(filesystemLibrary.OLSKFilesystemSafeBasenameFor("alpha:bravo"), "alpha bravo");
  });
  
  it('returns without Star', function() {
  	assert.strictEqual(filesystemLibrary.OLSKFilesystemSafeBasenameFor("alpha*bravo"), "alpha bravo");
  });
  
  it('returns without Question', function() {
  	assert.strictEqual(filesystemLibrary.OLSKFilesystemSafeBasenameFor("alpha?bravo"), "alpha bravo");
  });
  
  it('returns without Pipeline', function() {
  	assert.strictEqual(filesystemLibrary.OLSKFilesystemSafeBasenameFor("alpha|bravo"), "alpha bravo");
  });
  
  it('returns without Underscore', function() {
  	assert.strictEqual(filesystemLibrary.OLSKFilesystemSafeBasenameFor("alpha_bravo"), "alpha bravo");
  });
  
  it('returns without GreaterLessThan', function() {
  	assert.strictEqual(filesystemLibrary.OLSKFilesystemSafeBasenameFor("alpha<bravo>charlie"), "alpha bravo charlie");
  });
  
  it('returns without Slashes', function() {
  	assert.strictEqual(filesystemLibrary.OLSKFilesystemSafeBasenameFor("alpha/bravo\\charlie"), "alpha bravo charlie");
  });
  
  it('returns without Quotes', function() {
  	assert.strictEqual(filesystemLibrary.OLSKFilesystemSafeBasenameFor("\"alpha\" 'bravo' “charlie” ‘delta’ «echo»"), "alpha bravo charlie delta echo");
  });
  
  it('returns without Whitespace', function() {
  	assert.strictEqual(filesystemLibrary.OLSKFilesystemSafeBasenameFor("alpha\nbravo\tcharlie"), "alpha bravo charlie");
  });
  
  it('returns without DisallowedMultiple', function() {
  	assert.strictEqual(filesystemLibrary.OLSKFilesystemSafeBasenameFor("alpha \n\t bravo"), "alpha bravo");
  });
  
  it('returns without DisallowedEnds', function() {
  	assert.strictEqual(filesystemLibrary.OLSKFilesystemSafeBasenameFor(" \n\t alpha bravo \t\n "), "alpha bravo");
  });
  
  it('returns without Dashes', function() {
  	assert.strictEqual(filesystemLibrary.OLSKFilesystemSafeBasenameFor("alpha-bravo–charlie—delta"), "alpha-bravo–charlie—delta");
  });
  
  it('returns without Brackets', function() {
  	assert.strictEqual(filesystemLibrary.OLSKFilesystemSafeBasenameFor("(alpha) [bravo] {charlie}"), "(alpha) [bravo] {charlie}");
  });
  
  it('returns without International', function() {
  	assert.strictEqual(filesystemLibrary.OLSKFilesystemSafeBasenameFor("àlpha niño 縦書き 😀 € $"), "àlpha niño 縦書き 😀 € $");
  });

});
