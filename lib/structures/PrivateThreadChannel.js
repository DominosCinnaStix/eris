"use strict";

const ThreadChannel = require("./ThreadChannel");

/**
 * Represents a private thread channel. See ThreadChannel for extra properties.
 * @extends ThreadChannel
 * @prop {Object} threadMetadata Metadata for the thread
 * @prop {Boolean} threadMetadata.archived Whether the thread is archived
 * @prop {Number} threadMetadata.archiveTimestamp Timestamp when the thread's archive status was last changed, used for calculating recent activity
 * @prop {Number} threadMetadata.autoArchiveDuration Duration in minutes to automatically archive the thread after recent activity, either 60, 1440, 4320 or 10080
 * @prop {Number?} threadMetadata.createTimestamp Timestamp when the thread was created (only available for threads created after 09 January 2022)
 * @prop {Boolean} threadMetadata.invitable Whether non-moderators can add other non-moderators to the thread
 * @prop {Boolean} threadMetadata.locked Whether the thread is locked
 */
class PrivateThreadChannel extends ThreadChannel {
    constructor(data, client, messageLimit) {
        super(data, client, messageLimit);
        this.update(data);
    }

    update(data) {
        super.update(data);
        if(data.thread_metadata !== undefined) {
            this.threadMetadata = {
                archiveTimestamp: Date.parse(data.thread_metadata.archive_timestamp),
                archived: data.thread_metadata.archived,
                autoArchiveDuration: data.thread_metadata.auto_archive_duration,
                invitable: data.thread_metadata.invitable,
                locked: data.thread_metadata.locked
            };
            if(data.thread_metadata.create_timestamp !== undefined) {
                this.threadMetadata.createTimestamp = Date.parse(data.thread_metadata.create_timestamp) || null;
            }
        }
    }
}

module.exports = PrivateThreadChannel;
