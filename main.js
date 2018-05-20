/*!
 * OldSkool
 * Copyright(c) 2018 Rosano Coutinho
 * MIT Licensed
 */

var fsPackage = require('fs');
var mkdirpPackage = require('mkdirp');

//_ OLSKFilesystemInputDataIsRealDirectoryPath

exports.OLSKFilesystemInputDataIsRealDirectoryPath = function(inputData) {
	if (!fsPackage.existsSync(inputData)) {
		return false;
	}

	return fsPackage.lstatSync(inputData).isDirectory();
};

//_ OLSKFilesystemInputDataIsRealFilePath

exports.OLSKFilesystemInputDataIsRealFilePath = function(inputData) {
	if (!fsPackage.existsSync(inputData)) {
		return false;
	}

	return fsPackage.lstatSync(inputData).isFile();
};

//_ OLSKFilesystemHelpCreateDirectoryIfDoesNotExist

exports.OLSKFilesystemHelpCreateDirectoryIfDoesNotExist = function(directoryPath) {
	if (!fsPackage.existsSync(directoryPath)) {
		mkdirpPackage.sync(directoryPath);
	}

	return null;
};

//_ OLSKFilesystemHelpDeleteDirectoryRecursive

exports.OLSKFilesystemHelpDeleteDirectoryRecursive = function(directoryPath) {
	if (!fsPackage.existsSync(directoryPath)) {
		return 0;
	}

	if (!fsPackage.lstatSync(directoryPath).isDirectory()) {
		return 0;
	}

	fsPackage.readdirSync(directoryPath).forEach(function(fileName) {
		var currentPath = directoryPath + '/' + fileName;
		if (fsPackage.lstatSync(currentPath).isDirectory()) {
			exports.OLSKFilesystemHelpDeleteDirectoryRecursive(currentPath);
		} else {
			fsPackage.unlinkSync(currentPath);
		}
	});

	fsPackage.rmdirSync(directoryPath);
	return 1;
};

//_ OLSKFilesystemAppDirectoryName

exports.OLSKFilesystemAppDirectoryName = function() {
	return 'os-app';
};

//_ OLSKFilesystemCacheDirectoryName

exports.OLSKFilesystemCacheDirectoryName = function() {
	return 'os-cache';
};

//_ OLSKFilesystemDataDirectoryName

exports.OLSKFilesystemDataDirectoryName = function() {
	return 'os-data';
};

//_ OLSKFilesystemPublicDirectoryName

exports.OLSKFilesystemPublicDirectoryName = function() {
	return 'os-public';
};

//_ OLSKFilesystemSystemDirectoryName

exports.OLSKFilesystemSystemDirectoryName = function() {
	return 'os-system';
};

//_ OLSKFilesystemWorkspaceTestingDirectoryName

exports.OLSKFilesystemWorkspaceTestingDirectoryName = function() {
	return 'os-workspace-testing';
};

//_ OLSKFilesystemWorkspaceTestingDirectorySubfolderNameFor

exports.OLSKFilesystemWorkspaceTestingDirectorySubfolderNameFor = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('OLSKErrorInputInvalid');
	}

	if (inputData === '') {
		throw new Error('OLSKErrorInputInvalid');
	}

	return ['test', inputData].join('.').replace(/\./g, '-');
};

//_ OLSKFilesystemLaunchFileName

exports.OLSKFilesystemLaunchFileName = function() {
	return 'os-launch.js';
};

//_ OLSKFilesystemSharedFileExtensionJSON

exports.OLSKFilesystemSharedFileExtensionJSON = function() {
	return 'json';
};

//_ OLSKFilesystemDefaultTextEncoding

exports.OLSKFilesystemDefaultTextEncoding = function() {
	return 'utf8';
};
