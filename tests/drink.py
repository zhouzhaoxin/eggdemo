#!/usr/bin/env python
# -*- coding: utf-8 -*-
from handler.base import *
from control import ctrl
from random import choice
from tornado.options import options
actions = {'喝一杯': 'https://qncweb.ktvsky.com/20190710/vadd/e16283227d00e86838efa595bba5cb99.png',
           '找人干杯': 'https://qncweb.ktvsky.com/20190710/vadd/48d02d0674933d1d86a9666bb5f0a1dc.png',
           '指定喝光': 'https://qncweb.ktvsky.com/20190710/vadd/6373e303dd02c1eee1721439a267d02d.png',
           '找人喝光': 'https://qncweb.ktvsky.com/20190710/vadd/2a64f539f323603b2e047885d042bdae.png',
           '自饮两杯': 'https://qncweb.ktvsky.com/20190710/vadd/25040868c40f484e1eaa7807bf4b8cfe.png',
           '干一瓶': 'https://qncweb.ktvsky.com/20190710/vadd/26a59707fb3c95382378f83d0ed9f079.png',
           '喝一半': 'https://qncweb.ktvsky.com/20190710/vadd/3e7e8d719d0dfa14b5b4289d4b56a139.png',
           '喝交杯': 'https://qncweb.ktvsky.com/20190710/vadd/0c4a4901379fd1e881402027bc6e9420.png'}
async def send_stb_ba_text(room, user, action_name):
    data = {
        'command': 'ba_screen',
        'order_id': '',
        'bg_img': {
            'url_top': 'https://qncweb.ktvsky.com/vadd/9acff30c0c38074a8b9c39ea26a9328b.png',
            'url_mid': 'https://qncweb.ktvsky.com/vadd/f2941ec5de98e33c50f5985ad248c54f.png',
            'url_bottom': 'https://qncweb.ktvsky.com/vadd/114767e3d4a68ccbc1ed4b85ab69a6d1.png',
            'pos_x': 500,
            'pos_y': 0,
        },
        'shadow_img': {
            'shadow_url': 'https://qncweb.ktvsky.com/vadd/904ddc2be143495bc7b4f0f65c7ef3de.png',
            'pos_x': 200,
            'pos_y': 5,
        },
        'user_info': {
            'user_name': user['nickname'],
            'user_pic': user.get('headimgurl', 'https://qncweb.ktvsky.com/20190710/vadd/8316ee1cfc9fbd3453fc134053f53d63.png'),
            'name_x': 80,
            'name_y': 75,
            'font_size': 22,
            'font_colour': 4294967295,
            'width': 305
        },
        'content': {
            'text': '恭喜<%s>喜中本次"幸运"惩罚：%s' % (user['nickname'], action_name),
            'pos_x': 35,
            'pos_y': 125,
            'font_size': 32,
            'font_colour': 4294967295,
            'width': 415
        },
        'action': {
            'time_left': 0,
            'times': 1,
            'duration': 6,
            'interval': 1,
        },
        'settop': 0
    }
    source = [data['bg_img']['url_top'], data['bg_img']['url_mid'], data['bg_img']['url_bottom'],
              data['shadow_img']['shadow_url'], data['user_info']['user_pic']]
    try:
        str(room['room_id'])
        int(room['room_id'])
    except:
        await utils.send_ngrok_lk_v2(room['room_id'], data)
    else:
        await utils.send_ngrok_v2(room['ktvid'], room['room_ip'], room['room_info'], data, source)
async def send_stb_ba(room, user, action_name):
    data = {
        'command': 'ba_screen_v2',
        'order_id': '',
        "userMainPic": {
            "mainPic": 'https://qncweb.ktvsky.com/20190401/vadd/4eb497c5c2bfd26e5d98de6ffc054480.png',
            "mainPic_x": 300,
            "mainPic_y": 0,
            "mainPic_w": 680,
            "mainPic_h": 450
        },
        "userSubPic": {
            "subPic": [actions[action_name]],
            "subPic_x": 300,
            "subPic_y": 0,
            "subPic_w": 680,
            "subPic_h": 450
        },
        'shadow_img': {
            'shadow_url': 'https://qncweb.ktvsky.com/20190419/vadd/b1b6ddabafcb3e97204815de101ba684.png',
            'pos_x': 60,
            'pos_y': 360,
        },
        'vip': {
            'vip_pic': 'https://qncweb.ktvsky.com/20190417/vadd/1488636c2fdf918aca7b4bbd093d79d0.png',
            'vip_x': 92,
            'vip_y': 387,
            'vip_w': 20,
            'vip_h': 21,
        },
        'user_info': {
            'user_name': user['nickname'],
            'user_pic': user.get('headimgurl', 'https://qncweb.ktvsky.com/20190710/vadd/8316ee1cfc9fbd3453fc134053f53d63.png'),
            'name_x': 62,
            'name_y': 362,
            'font_size': 22,
            'font_colour': 4294967295,
            'width': 44,
            'height': 44,
            'IsVip': 1
        },
        'content': {
            'text': '恭喜<%s>喜中本次"幸运"惩罚：%s' % (user['nickname'], action_name),
            'pos_x': 136,
            'pos_y': 370,
            'font_size': 26,
            'font_colour': 4294967295,
            'width': 420,
            'height': 80
        },
        'action': {
            'time_left': 0,
            'duration': 6,
            'interval': 1,
        },
        'times_info': {
            'times': 2,
            'times_x': 560,
            'times_y': 174,
            'times_w': 80,
            'times_h': 70,
            'times_size': 50,
            'times_color': 4294967295
        }
    }
    source = [data['userMainPic']['mainPic'], data['userSubPic']['subPic'][0], data['user_info']['user_pic'], data['shadow_img']['shadow_url']]
    try:
        str(room['room_id'])
        int(room['room_id'])
    except:
        await utils.send_ngrok_lk_v2(room['room_id'], data)
    else:
        await utils.send_ngrok_v2(room['ktvid'], room['room_ip'], room['room_info'], data, source)
class PlayersHandler(BaseHandler):
    async def get(self):
        try:
            openid = self.get_argument('openid')
            unionid = self.get_argument('unionid')
        except:
            raise utils.APIError(errcode=10001)
        if options.debug:
            room = await get_bind_room_info(unionid)
            roomid = room['room_id']
        else:
            roomid = ctrl.vod_new.get_user_bind_roomid_ctl(unionid)
            if not roomid:
                raise utils.APIError(errcode=50001, errmsg='not bind room')
        players = ctrl.vod_new.get_game_drink_players_ctl(openid, roomid)
        action = ctrl.vod_new.get_game_drink_start_ctl(roomid)
        last_master_oid = ctrl.vod_new.get_game_drink_room_last_master_ctl(roomid)
        master = 0
        data = []
        for index, oid in enumerate(players):
            if oid == last_master_oid:
                master = index + 1
                try:
                    _ = players[master]
                except:
                    master = 0
            user = ctrl.vod_new.get_wx_user_ctl(oid)
            if not user:
                user['openid'] = openid
                user['unionid'] = unionid
                user['nickname'] = '匿名'
                user['headimgurl'] = 'https://qncweb.ktvsky.com/20190710/vadd/8316ee1cfc9fbd3453fc134053f53d63.png'
            if user['headimgurl'] == '':
                user['headimgurl'] = 'https://qncweb.ktvsky.com/20190710/vadd/8316ee1cfc9fbd3453fc134053f53d63.png'
            data.append(user)
        return self.send_json({'data': data, 'action': action, 'master': master})
class StartHandler(BaseHandler):
    async def get(self):
        try:
            openid = self.get_argument('openid')
            unionid = self.get_argument('unionid')
        except:
            raise utils.APIError(errcode=10001)
        if options.debug:
            room = await get_bind_room_info(unionid)
            roomid = room['room_id']
            func = await utils.http_get_async(
                'https://coupon.ktvsky.com/stb/func?openid={}&unionid={}'.format(openid, unionid))
        else:
            roomid = ctrl.vod_new.get_user_bind_roomid_ctl(unionid)
            if roomid:
                room = ctrl.vod_new.get_room_ctl(roomid)
                room['room_id'] = roomid
                if not room.get('ktvid', ''):
                    raise utils.APIError(errcode=50001, errmsg='请重新扫码绑定房台')
            else:
                raise utils.APIError(errcode=50001, errmsg='请重新扫码绑定房台')
            func = ctrl.vod_new.get_stb_func_ctl(roomid)
        key = 'game_drink_players_room_%s' % roomid
        key_start = 'game_drink_start_room_%s' % roomid
        key_master = 'game_drink_room_master_%s' % roomid
        res = ctrl.rs.zrange(key, 0, -1, desc=False, withscores=True)
        player_oid = choice([r[0].decode() for r in res])
        action_name = choice(list(actions.keys()))
        ctrl.rs.set(key_start, action_name, 48 * 3600)
        ctrl.rs.set(key_master, openid, 48 * 3600)
        user = ctrl.vod_new.get_wx_user_ctl(player_oid)
        if not user:
            user['openid'] = openid
            user['unionid'] = unionid
            user['nickname'] = '匿名'
            user['headimgurl'] = 'https://qncweb.ktvsky.com/20190710/vadd/8316ee1cfc9fbd3453fc134053f53d63.png'
        if user['headimgurl'] == '':
            user['headimgurl'] = 'https://qncweb.ktvsky.com/20190710/vadd/8316ee1cfc9fbd3453fc134053f53d63.png'
        if int(func.get('ba', 0)) > 1:
            await send_stb_ba(room, user, action_name)
        else:
            await send_stb_ba_text(room, user, action_name)
        ctrl.vadd_rs.incr('game_start_count_%s' % datetime.datetime.now().strftime('%Y%m%d'))
        return self.send_json({'action': action_name})
class QuitHandler(BaseHandler):
    async def get(self):
        try:
            openid = self.get_argument('openid')
            unionid = self.get_argument('unionid')
        except:
            raise utils.APIError(errcode=10001)
        if options.debug:
            room = await get_bind_room_info(unionid)
            roomid = room['room_id']
        else:
            roomid = ctrl.vod_new.get_user_bind_roomid_ctl(unionid)
            if not roomid:
                raise utils.APIError(errcode=50001, errmsg='not bind room')
        key = 'game_drink_players_room_%s' % roomid
        result = ctrl.rs.zrem(key, openid)
        return self.send_json({'result': result})