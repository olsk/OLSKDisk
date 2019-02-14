/*!
 * OLSKDisk
 * Copyright(c) 2018 Rosano Coutinho
 * MIT Licensed
 */

var fsPackage = require('fs');
var mkdirpPackage = require('mkdirp');

//_ OLSKDiskInputDataIsRealDirectoryPath

exports.OLSKDiskInputDataIsRealDirectoryPath = function(inputData) {
	if (!fsPackage.existsSync(inputData)) {
		return false;
	}

	return fsPackage.lstatSync(inputData).isDirectory();
};

//_ OLSKDiskInputDataIsRealFilePath

exports.OLSKDiskInputDataIsRealFilePath = function(inputData) {
	if (!fsPackage.existsSync(inputData)) {
		return false;
	}

	return fsPackage.lstatSync(inputData).isFile();
};

//_ OLSKDiskCreateFolder

exports.OLSKDiskCreateFolder = function(inputData) {
	if (!fsPackage.existsSync(inputData)) {
		mkdirpPackage.sync(inputData);
	}

	return inputData;
};

//_ OLSKDiskHelpDeleteDirectoryRecursive

exports.OLSKDiskHelpDeleteDirectoryRecursive = function(directoryPath) {
	if (!fsPackage.existsSync(directoryPath)) {
		return 0;
	}

	if (!fsPackage.lstatSync(directoryPath).isDirectory()) {
		return 0;
	}

	fsPackage.readdirSync(directoryPath).forEach(function(fileName) {
		var currentPath = directoryPath + '/' + fileName;
		if (fsPackage.lstatSync(currentPath).isDirectory()) {
			exports.OLSKDiskHelpDeleteDirectoryRecursive(currentPath);
		} else {
			fsPackage.unlinkSync(currentPath);
		}
	});

	fsPackage.rmdirSync(directoryPath);
	return 1;
};

//_ OLSKDiskAppDirectoryName

exports.OLSKDiskAppDirectoryName = function() {
	return 'os-app';
};

//_ OLSKDiskCacheDirectoryName

exports.OLSKDiskCacheDirectoryName = function() {
	return 'os-cache';
};

//_ OLSKDiskDataDirectoryName

exports.OLSKDiskDataDirectoryName = function() {
	return 'os-data';
};

//_ OLSKDiskPublicDirectoryName

exports.OLSKDiskPublicDirectoryName = function() {
	return 'os-public';
};

//_ OLSKDiskWorkspaceTestingDirectoryName

exports.OLSKDiskWorkspaceTestingDirectoryName = function() {
	return 'os-workspace-testing';
};

//_ OLSKDiskWorkspaceTestingDirectorySubfolderNameFor

exports.OLSKDiskWorkspaceTestingDirectorySubfolderNameFor = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('OLSKErrorInputInvalid');
	}

	if (inputData === '') {
		throw new Error('OLSKErrorInputInvalid');
	}

	return ['test', inputData].join('.').replace(/\./g, '-');
};

//_ OLSKDiskLaunchFileName

exports.OLSKDiskLaunchFileName = function() {
	return 'os-launch.js';
};

//_ OLSKDiskDefaultTextEncoding

exports.OLSKDiskDefaultTextEncoding = function() {
	return 'utf8';
};

//_ OLSKDiskSafeBasenameFor

exports.OLSKDiskSafeBasenameFor = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('OLSKErrorInputInvalid');
	}

	return inputData.replace(/[\.,;:\*\?\|_<>\\\/\"\'\“\”\‘\’\«\»]/g, ' ').split(/\s/).filter(function(e) {
		return e.trim() !== '';
	}).join(' ');
};
