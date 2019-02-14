/*!
 * OLSKDisk
 * Copyright(c) 2018 Rosano Coutinho
 * MIT Licensed
 */

var fsPackage = require('fs');
var mkdirpPackage = require('mkdirp');

//_ OLSKDiskIsRealFolderPath

exports.OLSKDiskIsRealFolderPath = function(inputData) {
	if (!fsPackage.existsSync(inputData)) {
		return false;
	}

	return fsPackage.lstatSync(inputData).isDirectory();
};

//_ OLSKDiskIsRealFilePath

exports.OLSKDiskIsRealFilePath = function(inputData) {
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

//_ OLSKDiskDeleteFolder

exports.OLSKDiskDeleteFolder = function(directoryPath) {
	if (!fsPackage.existsSync(directoryPath)) {
		return 0;
	}

	if (!fsPackage.lstatSync(directoryPath).isDirectory()) {
		return 0;
	}

	fsPackage.readdirSync(directoryPath).forEach(function(fileName) {
		var currentPath = directoryPath + '/' + fileName;
		if (fsPackage.lstatSync(currentPath).isDirectory()) {
			exports.OLSKDiskDeleteFolder(currentPath);
		} else {
			fsPackage.unlinkSync(currentPath);
		}
	});

	fsPackage.rmdirSync(directoryPath);
	return 1;
};

//_ OLSKDiskAppFolderName

exports.OLSKDiskAppFolderName = function() {
	return 'os-app';
};

//_ OLSKDiskCacheFolderName

exports.OLSKDiskCacheFolderName = function() {
	return 'os-cache';
};

//_ OLSKDiskDataFolderName

exports.OLSKDiskDataFolderName = function() {
	return 'os-data';
};

//_ OLSKDiskPublicFolderName

exports.OLSKDiskPublicFolderName = function() {
	return 'os-public';
};

//_ OLSKDiskWorkspaceTestingFolderName

exports.OLSKDiskWorkspaceTestingFolderName = function() {
	return 'os-workspace-testing';
};

//_ OLSKDiskWorkspaceTestingFolderSubfolderNameFor

exports.OLSKDiskWorkspaceTestingFolderSubfolderNameFor = function(inputData) {
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
