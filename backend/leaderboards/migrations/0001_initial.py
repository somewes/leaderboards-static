# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Platform'
        db.create_table(u'leaderboards_platform', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=128)),
        ))
        db.send_create_signal(u'leaderboards', ['Platform'])

        # Adding model 'Game'
        db.create_table(u'leaderboards_game', (
            ('abbreviation', self.gf('django.db.models.fields.CharField')(max_length=32, primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=512)),
        ))
        db.send_create_signal(u'leaderboards', ['Game'])

        # Adding M2M table for field platforms on 'Game'
        m2m_table_name = db.shorten_name(u'leaderboards_game_platforms')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('game', models.ForeignKey(orm[u'leaderboards.game'], null=False)),
            ('platform', models.ForeignKey(orm[u'leaderboards.platform'], null=False))
        ))
        db.create_unique(m2m_table_name, ['game_id', 'platform_id'])

        # Adding model 'Tag'
        db.create_table(u'leaderboards_tag', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('game', self.gf('django.db.models.fields.related.ForeignKey')(related_name='tags', to=orm['leaderboards.Game'])),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=256)),
            ('type', self.gf('django.db.models.fields.CharField')(max_length=32)),
            ('timed', self.gf('django.db.models.fields.BooleanField')(default=False)),
        ))
        db.send_create_signal(u'leaderboards', ['Tag'])

        # Adding model 'TagValue'
        db.create_table(u'leaderboards_tagvalue', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('game', self.gf('django.db.models.fields.related.ForeignKey')(related_name='tagvalues', to=orm['leaderboards.Game'])),
            ('tag', self.gf('django.db.models.fields.related.ForeignKey')(related_name='tagvalues', blank=True, to=orm['leaderboards.Tag'])),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=256)),
            ('description', self.gf('django.db.models.fields.TextField')(blank=True)),
        ))
        db.send_create_signal(u'leaderboards', ['TagValue'])

        # Adding model 'Speedrun'
        db.create_table(u'leaderboards_speedrun', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('time', self.gf('django.db.models.fields.PositiveIntegerField')()),
            ('game', self.gf('django.db.models.fields.related.ForeignKey')(related_name='speedruns', to=orm['leaderboards.Game'])),
            ('platform', self.gf('django.db.models.fields.related.ForeignKey')(related_name='+', to=orm['leaderboards.Platform'])),
            ('video', self.gf('django.db.models.fields.CharField')(max_length=1024, blank=True)),
            ('comments', self.gf('django.db.models.fields.TextField')(blank=True)),
        ))
        db.send_create_signal(u'leaderboards', ['Speedrun'])

        # Adding M2M table for field tagvalues on 'Speedrun'
        m2m_table_name = db.shorten_name(u'leaderboards_speedrun_tagvalues')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('speedrun', models.ForeignKey(orm[u'leaderboards.speedrun'], null=False)),
            ('tagvalue', models.ForeignKey(orm[u'leaderboards.tagvalue'], null=False))
        ))
        db.create_unique(m2m_table_name, ['speedrun_id', 'tagvalue_id'])

        # Adding model 'Filter'
        db.create_table(u'leaderboards_filter', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=256)),
            ('displaylength', self.gf('django.db.models.fields.PositiveIntegerField')()),
            ('game', self.gf('django.db.models.fields.related.ForeignKey')(related_name='filters', to=orm['leaderboards.Game'])),
        ))
        db.send_create_signal(u'leaderboards', ['Filter'])

        # Adding M2M table for field tagvalues on 'Filter'
        m2m_table_name = db.shorten_name(u'leaderboards_filter_tagvalues')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('filter', models.ForeignKey(orm[u'leaderboards.filter'], null=False)),
            ('tagvalue', models.ForeignKey(orm[u'leaderboards.tagvalue'], null=False))
        ))
        db.create_unique(m2m_table_name, ['filter_id', 'tagvalue_id'])


    def backwards(self, orm):
        # Deleting model 'Platform'
        db.delete_table(u'leaderboards_platform')

        # Deleting model 'Game'
        db.delete_table(u'leaderboards_game')

        # Removing M2M table for field platforms on 'Game'
        db.delete_table(db.shorten_name(u'leaderboards_game_platforms'))

        # Deleting model 'Tag'
        db.delete_table(u'leaderboards_tag')

        # Deleting model 'TagValue'
        db.delete_table(u'leaderboards_tagvalue')

        # Deleting model 'Speedrun'
        db.delete_table(u'leaderboards_speedrun')

        # Removing M2M table for field tagvalues on 'Speedrun'
        db.delete_table(db.shorten_name(u'leaderboards_speedrun_tagvalues'))

        # Deleting model 'Filter'
        db.delete_table(u'leaderboards_filter')

        # Removing M2M table for field tagvalues on 'Filter'
        db.delete_table(db.shorten_name(u'leaderboards_filter_tagvalues'))


    models = {
        u'auth.group': {
            'Meta': {'object_name': 'Group'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'auth.permission': {
            'Meta': {'ordering': "(u'content_type__app_label', u'content_type__model', u'codename')", 'unique_together': "((u'content_type', u'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        u'leaderboards.filter': {
            'Meta': {'object_name': 'Filter'},
            'displaylength': ('django.db.models.fields.PositiveIntegerField', [], {}),
            'game': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'filters'", 'to': u"orm['leaderboards.Game']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '256'}),
            'tagvalues': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'tagvalues'", 'symmetrical': 'False', 'to': u"orm['leaderboards.TagValue']"})
        },
        u'leaderboards.game': {
            'Meta': {'object_name': 'Game'},
            'abbreviation': ('django.db.models.fields.CharField', [], {'max_length': '32', 'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '512'}),
            'platforms': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'platforms'", 'symmetrical': 'False', 'to': u"orm['leaderboards.Platform']"})
        },
        u'leaderboards.platform': {
            'Meta': {'object_name': 'Platform'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '128'})
        },
        u'leaderboards.speedrun': {
            'Meta': {'object_name': 'Speedrun'},
            'comments': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'game': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'speedruns'", 'to': u"orm['leaderboards.Game']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'platform': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'+'", 'to': u"orm['leaderboards.Platform']"}),
            'tagvalues': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'speedrun'", 'symmetrical': 'False', 'to': u"orm['leaderboards.TagValue']"}),
            'time': ('django.db.models.fields.PositiveIntegerField', [], {}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"}),
            'video': ('django.db.models.fields.CharField', [], {'max_length': '1024', 'blank': 'True'})
        },
        u'leaderboards.tag': {
            'Meta': {'object_name': 'Tag'},
            'game': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'tags'", 'to': u"orm['leaderboards.Game']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '256'}),
            'timed': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'type': ('django.db.models.fields.CharField', [], {'max_length': '32'})
        },
        u'leaderboards.tagvalue': {
            'Meta': {'object_name': 'TagValue'},
            'description': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'game': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'tagvalues'", 'to': u"orm['leaderboards.Game']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '256'}),
            'tag': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'tagvalues'", 'blank': 'True', 'to': u"orm['leaderboards.Tag']"})
        }
    }

    complete_apps = ['leaderboards']